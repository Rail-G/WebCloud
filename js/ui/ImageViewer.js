/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.preview = this.element.querySelector('.image');
    this.imageArray = this.element.querySelector('.row')
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    
    this.imageArray.addEventListener('contextmenu', (e) => {
      this.preview.src = e.target.src;
    })
    
    this.imageArray.addEventListener('click', (e) => {
      e.target.classList.toggle('selected');
      this.checkButtonText();
    })




    document.querySelector('.select-all').addEventListener('click', () => {
      const allImage = this.imageArray.querySelectorAll('img');
      const someImage = this.forSome(allImage)
      if (someImage) {
        allImage.forEach(elem => {
          elem.classList.remove('selected')
        })
      } else ( 
        allImage.forEach(elem => {
          elem.classList.add('selected')
        })
      )
      this.checkButtonText()
    })

    document.querySelector('.show-uploaded-files').addEventListener('click', () => {
      const modal = App.getModal('filePreviewer')
      document.querySelector('.uploaded-previewer-modal .content').innerHTML = '<i class="asterisk loading icon massive"></i>'
      modal.open()
      Yandex.getUploadedFiles((result) => {
        modal.showImages(result)
      })
    })

    document.querySelector('.send').addEventListener('click', () => {
      const modal = App.getModal('fileUploader')
      const imageSrc = Array.from(this.imageArray.querySelectorAll('.selected')).map(elem => elem.src)
      modal.open()
      modal.showImages(imageSrc)
    })
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imageArray.innerHTML = "";

  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      document.querySelector('.select-all').classList.remove('disabled')
    } else {
      document.querySelector('.select-all').classList.add('disabled')
    }
    images.forEach(elem => {
      const div = document.createElement('div');
      const img = document.createElement('img');
      div.classList.add('four', 'wide', 'column', 'ui', 'medium', 'image-wrapper');
      img.src = elem.url;
      div.appendChild(img);
      document.querySelector('.images-list .grid .row').appendChild(div);
    })
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const allDrawedImage = this.imageArray.querySelectorAll('img');
    const selectAll = document.querySelector('.select-all');
    const send = document.querySelector('.send');

    const resultSend = this.forSome(allDrawedImage)

    resultSend ? send.classList.remove('disabled') : send.classList.add('disabled')
    selectAll.textContent = resultSend ? "Снять выделение" : "Выбрать всё"
  }

  forSome(arr) {
    return Array.from(arr).some(elem => elem.classList.contains('selected'))
  }
}
