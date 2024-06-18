/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    const input = this.element.querySelector('input')
    this.element.querySelectorAll('button').forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (input.value.trim()) {
          if (e.target.classList.contains('add')) {
            e.target.classList.add('disabled')
            VK.get(input.value, App.imageViewer.drawImages)
          } else if (e.target.classList.contains('replace')) {
            App.imageViewer.clear()
            VK.get(input.value, App.imageViewer.drawImages)
          }
        }
      })
    })
  }

}