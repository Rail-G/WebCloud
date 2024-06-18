/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = 'Your Token';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    VK.lastCallback = callback;
    const script = document.createElement('script');
    script.id = 'requestScript';
    script.src = `https://api.vk.com/method/photos.get?access_token=${VK.ACCESS_TOKEN}&owner_id=${id}&album_id=profile&v=5.199&callback=VK.processData`;
    document.querySelector('body').appendChild(script)
    
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    const largePhotos = [];

    document.querySelector('#requestScript').remove();
    if (result.error) {
      alert(`Error: ${result.error.error_code} --> ${result.error.error_msg}`);
      return
    }

    if (result.response.items) {
      result.response.items.forEach(elem => {
        const largePhoto = elem.sizes[elem.sizes.length - 1];
        largePhotos.push(largePhoto);
      })

      VK.lastCallback(largePhotos);
      VK.lastCallback = () => {};
    }

  }

}
