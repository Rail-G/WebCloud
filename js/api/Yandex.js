/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    const token = localStorage.getItem('poligonToken');
    if (!token) {
      const newToken = prompt('Пожалуйста, введите ваш токен от ЯДиска (poligon): ')
      localStorage.setItem('poligonToken', newToken)
    }
    return token
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    const requestData = {
      method: 'POST',
      url: Yandex.HOST + '/resources/upload',
      data: {path, url}, 
      headers: {"Authorization": `OAuth ${this.getToken()}`, "Accept": 'application/json', "Content-Type": 'application/json'},
      callback: callback,
    };
    createRequest(requestData)
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    const requestData = {
      method: 'DELETE',
      url: Yandex.HOST + '/resources',
      data: {path}, 
      headers: {"Authorization": `OAuth ${this.getToken()}`, "Accept": 'application/json', "Content-Type": 'application/json'},
      callback: callback,
    };
    createRequest(requestData)
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    const requestData = {
      method: 'GET',
      url: Yandex.HOST + '/resources/files',
      headers: {"Authorization": `OAuth ${this.getToken()}`},
      callback: callback,
    };
    createRequest(requestData)
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    const tagA = document.createElement('a');
    tagA.href = url;
    tagA.click();
  }
}

