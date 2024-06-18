/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.domElement.querySelector('.x').addEventListener('click', () => {
      this.close()
    })
    this.domElement.querySelector('.content').addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        e.target.querySelector('i').classList.add('icon', 'spinner', 'loading')
        e.target.classList.add('disabled')
        Yandex.removeFile(e.target.dataset.path, (result) => {
          if (result === null) {
            e.target.closest('.image-preview-container').remove()
          }
        })
      } else if (e.target.classList.contains('download')) {
        Yandex.downloadFileByUrl(e.target.dataset.file)
      }
    })
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    const imageArray = [];
    console.log(data)
    if (data === null) {
      this.domElement.querySelector('.content').innerHTML = 'None'
      return
    }
    data.items.reverse();
    data.items.forEach(elem => {
      imageArray.push(this.getImageInfo(elem));
    })
    this.domElement.querySelector('.content').innerHTML = imageArray.join('');


  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    const event = new Date(date);
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    return event.toLocaleDateString('ru-RU', options)
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    return `<div class="image-preview-container">
      <img src='${item.file}' />
      <table class="ui celled table">
      <thead>
        <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
      </thead>
      <tbody>
        <tr><td>${item.name}</td><td>${this.formatDate(item.created)}</td><td>${(item.size / 1024).toFixed(1)} Кб.</td></tr>
      </tbody>
      </table>
      <div class="buttons-wrapper">
        <button class="ui labeled icon red basic button delete" data-path='${item.path}'>
          Удалить
          <i class="trash icon"></i>
        </button>
        <button class="ui labeled icon violet basic button download" data-file='${item.file}'>
          Скачать
          <i class="download icon"></i>
        </button>
      </div>
    </div>`

  }
}
