/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.closeBtn = this.domElement.querySelector('.close')
    this.content = this.domElement.querySelector('.content')
    this.sendAllBtn = this.domElement.querySelector('.send-all')
    this.registerEvents();
    
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.domElement.querySelector('.x').addEventListener('click', () => {
      this.close()
    })
    this.closeBtn.addEventListener('click', () => {this.close()})
    this.sendAllBtn.addEventListener('click', () => {this.sendAllImages()})
    this.content.addEventListener('click', (e) => {
      if (e.target.classList.contains('input')) {
        if (e.target.classList.contains('error')) {
          e.target.classList.remove('error')
        } 
      } else if (e.target === this.content.querySelector('button')) {
        this.sendImage(e.target.closest('.image-preview-container'))
      }
    })
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const imageArray = [];
    images.reverse();
    images.forEach(elem => {
      imageArray.push(this.getImageHTML(elem));
    })
    this.content.innerHTML = imageArray.join('')
    }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    return `
    <div class="image-preview-container">
      <img src='${item}' />
      <div class="ui action input">
        <input type="text" placeholder="Путь к файлу">
        <button class="ui button"><i class="upload icon"></i></button>
      </div>
    </div>
    `
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    const allImages = this.content.querySelectorAll('.image-preview-container');
    allImages.forEach(elem => {
      this.sendImage(elem)
    })
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const image = imageContainer.querySelector('input')
    const imageValue = image.value.trim();
    if (!imageValue) {
      image.parentElement.classList.add('error')
      return
    }

    if (imageValue) {
      image.parentElement.classList.add('disabled');
      const imageUrl = imageContainer.querySelector('img').src
      Yandex.uploadFile(`${imageValue}.jpg`, imageUrl, () => {
        imageContainer.remove();
        if (this.content.children.length <= 0) {
          this.close()
        }
      })
    }
  }
} 
