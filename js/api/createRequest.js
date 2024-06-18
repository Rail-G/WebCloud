/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    let params = ''
    const xhr = new XMLHttpRequest();
    for (const key in options.data) {
        params += key + '=' + encodeURIComponent(options.data[key]) + "&";
    }

    if (params) {
        params = '?' + params.substring(0, params.length - 1)
    }
    xhr.open(options.method, options.url + params)
    xhr.responseType = 'json';
    for (const key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key])
    }
    xhr.send()

    let result = null

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            result = xhr.response;
        } else {
            console.log(`Ошибка ${xhr.status} --> ${xhr.statusText}`)
        }
        return options.callback(result)
    })

    xhr.addEventListener('error', () => {
        alert('Ошибка соединения. Повторите запрос позже')
    })
};