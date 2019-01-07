'use strict';

var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';


(function () {
  var xhrequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var STATUS_OK = 200;

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  var uploadData = function (data, onLoad, onError) {
    var xhr = xhrequest(onLoad, onError);

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  var downloadData = function (onLoad, onError) {
    var xhr = xhrequest(onLoad, onError);

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };


  window.backend = {
    upload: uploadData,
    download: downloadData
  };
})();