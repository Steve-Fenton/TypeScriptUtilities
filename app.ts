import Ajax = require('Ajax');
import Notifier = require('Notifier');

function ajaxLogger(response) {
    var type = (response.status === 200) ? Notifier.MessageType.success : Notifier.MessageType.error;

    var overlay = new Notifier.Overlay();
    overlay.alert('Received a response of type: ' + response.status + '<br>' + response.responseText.substring(0, 100) + '...', type);
}

Ajax.httpGet('/test.txt', ajaxLogger, ajaxLogger, { name: 'Content-type', value: 'application/json' });

Ajax.httpGet('/errors.txt', ajaxLogger, ajaxLogger, { name: 'Content-type', value: 'application/json' });

Ajax.httpPost('/test.txt', { key: 'H12', type: 'some type' }, ajaxLogger, ajaxLogger);