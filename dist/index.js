'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var WebSocket = require('ws');

var CastDeviceEmulator = (function () {
  function CastDeviceEmulator() {
    _classCallCheck(this, CastDeviceEmulator);

    this.wss = new WebSocket.Server({
      port: 8008,
      path: '/v2/ipc'
    });
    this.recordedMessages = [];
    this._webSocketMessageHandler = this._webSocketMessageHandler.bind(this);
    this._webSocketConnectionHandler = this._webSocketConnectionHandler.bind(this);
  }

  _createClass(CastDeviceEmulator, [{
    key: 'loadScript',
    value: function loadScript(messages) {
      this.recordedMessages = messages;
    }
  }, {
    key: 'start',
    value: function start() {
      if (!this.wss) {
        throw new Error('WebSocket was not ready.');
      }
      // Starting to handle websocket connections
      this.wss.on('connection', this._webSocketConnectionHandler);
      console.log('Chromecast Device Emulator is waiting for connections..');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.wss.removeAllListeners('message');
      this.wss.removeAllListeners('connection');
    }
  }, {
    key: 'close',
    value: function close() {
      this.wss.close(function () {
        console.log('Chromecast Device Emulator is closed.');
      });
    }
  }, {
    key: '_webSocketConnectionHandler',
    value: function _webSocketConnectionHandler(ws) {
      console.log('There is a cast client just connected.');
      // Registering for message handler
      ws.on('message', this._webSocketMessageHandler);
      // Setting-up recorded message callback
      this.recordedMessages.map(function (m) {
        var sendRecordedMessage = function sendRecordedMessage() {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(m.message);
          }
        };
        setTimeout(sendRecordedMessage, m.time);
      });
    }
  }, {
    key: '_webSocketMessageHandler',
    value: function _webSocketMessageHandler(message) {
      //console.log('received: %s', message);
    }
  }]);

  return CastDeviceEmulator;
})();

exports['default'] = CastDeviceEmulator;
module.exports = exports['default'];