'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebSocket = require('ws');
var chalk = require('chalk');

var _require = require('./log'),
    log = _require.log,
    error = _require.error;

var Ajv = require('ajv');
var jsonSchemaValidator = new Ajv();

var serverConfig = {
  port: 8008,
  path: '/v2/ipc'
};

var CastDeviceEmulator = function () {
  function CastDeviceEmulator() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CastDeviceEmulator);

    this.opt = opt;
    this.wss = null;
    this.recordedMessages = [];
    this._webSocketMessageHandler = this._webSocketMessageHandler.bind(this);
    this._webSocketConnectionHandler = this._webSocketConnectionHandler.bind(this);
  }

  _createClass(CastDeviceEmulator, [{
    key: 'loadScenario',
    value: function loadScenario(scenarioFile) {
      if (!jsonSchemaValidator.validate(require('../schemas/scenario.json'), scenarioFile)) {
        throw new Error('Invalid scenario schema!');
      }
      this.recordedMessages = scenarioFile.timeline;
    }
  }, {
    key: 'start',
    value: function start(callback) {
      var _this = this;

      this.wss = new WebSocket.Server({
        port: serverConfig.port,
        path: serverConfig.path
      }, function () {
        // Starting to handle websocket connections
        _this.wss.on('connection', _this._webSocketConnectionHandler);
        if (!_this.opt.silent) {
          log('Established a websocket server at port ' + serverConfig.port);
          log('Ready for Chromecast receiver connections..');
        }
        if (callback) callback();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.wss.removeAllListeners('message');
      this.wss.removeAllListeners('connection');
    }
  }, {
    key: 'close',
    value: function close(callback) {
      var _this2 = this;

      if (!this.wss) {
        log('There is no websocket existing.');
        return;
      }
      this.wss.close(function () {
        if (!_this2.opt.silent) {
          log('Chromecast Device Emulator is closed.');
        }
        if (callback) callback();
      });
    }
  }, {
    key: '_webSocketConnectionHandler',
    value: function _webSocketConnectionHandler(ws) {
      if (!this.opt.silent) log('There is a cast client just connected.');
      // Registering for message handler
      ws.on('message', this._webSocketMessageHandler);
      // Setting-up recorded message callback
      this.recordedMessages.map(function (m) {
        // FIXME: Validate format before send it
        var sendRecordedMessage = function sendRecordedMessage() {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(m.ipcMessage);
            log(chalk.red('>>'), m.ipcMessage);
          }
        };
        setTimeout(sendRecordedMessage, m.time);
      });
    }
  }, {
    key: '_webSocketMessageHandler',
    value: function _webSocketMessageHandler(message) {
      log(chalk.green('<<'), message);
    }
  }]);

  return CastDeviceEmulator;
}();

module.exports = CastDeviceEmulator;