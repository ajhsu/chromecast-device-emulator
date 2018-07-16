'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebSocket = require('ws');
var chalk = require('chalk');

var _require = require('./log'),
    log = _require.log,
    error = _require.error;

/**
 * The JSON Schema validator
 */


var Ajv = require('ajv');
var jsonSchemaValidator = new Ajv();

/**
 * Configuration for WebSocket server
 */
var serverConfig = {
  port: 8008,
  path: '/v2/ipc'
};

var CastDeviceEmulator = function () {
  function CastDeviceEmulator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CastDeviceEmulator);

    this.options = options;

    /**
     * WebSocker server instance.
     */
    this.wss = null;

    /**
     * The recorded messages that we're going to serve.
     */
    this.recordedMessages = [];

    /**
     * Event handlers for WebSocket server
     */
    this._webSocketMessageHandler = this._webSocketMessageHandler.bind(this);
    this._webSocketConnectionHandler = this._webSocketConnectionHandler.bind(this);
  }

  /**
   * Load the specific scenario file
   */


  _createClass(CastDeviceEmulator, [{
    key: 'loadScenario',
    value: function loadScenario(scenarioFile) {
      if (!jsonSchemaValidator.validate(require('../schemas/scenario.json'), scenarioFile)) {
        throw new Error('Invalid scenario schema!');
      }
      this.recordedMessages = scenarioFile.timeline;
    }

    /**
     * Startup the emulator
     */

  }, {
    key: 'start',
    value: function start(callback) {
      this.wss = new WebSocket.Server({
        port: serverConfig.port,
        path: serverConfig.path
      },
      /**
       * When WebSocket server start listening,
       * we're going to listen to connection event as well.
       */
      function onListeningCallback() {
        this.wss.on('connection', this._webSocketConnectionHandler);
        if (!this.options.silent) {
          log('Established a websocket server at port ' + serverConfig.port);
          log('Ready for Chromecast receiver connections..');
        }
        if (callback) callback();
      }.bind(this));
    }

    /**
     * Stop handling events from WebSocket server
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.wss.removeAllListeners('message');
      this.wss.removeAllListeners('connection');
    }

    /**
     * Close the WebSocket server
     */

  }, {
    key: 'close',
    value: function close(callback) {
      var _this = this;

      if (!this.wss) {
        log('There is no websocket existing.');
        return;
      }
      this.wss.close(function () {
        if (!_this.options.silent) {
          log('Chromecast Device Emulator is closed.');
        }
        if (callback) callback();
      });
    }

    /**
     * Handle incoming WebSocket connections
     */

  }, {
    key: '_webSocketConnectionHandler',
    value: function _webSocketConnectionHandler(ws) {
      if (!this.options.silent) log('There is a cast client just connected.');
      /**
       * Listen to message events on each socket connection
       */
      ws.on('message', this._webSocketMessageHandler);
      /**
       * Iterate over the recorded messages
       * and set a triggering timer for every single message.
       */
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

    /**
     * Handle incoming WebSocket messages
     */

  }, {
    key: '_webSocketMessageHandler',
    value: function _webSocketMessageHandler(message) {
      log(chalk.green('<<'), message);
    }
  }]);

  return CastDeviceEmulator;
}();

module.exports = CastDeviceEmulator;