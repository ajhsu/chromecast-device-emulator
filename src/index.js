const WebSocket = require('ws');
const chalk = require('chalk');
const { log, error } = require('./log');

/**
 * The JSON Schema validator
 */
const Ajv = require('ajv');
const jsonSchemaValidator = new Ajv();

/**
 * Configuration for WebSocket server
 */
const serverConfig = {
  port: 8008,
  path: '/v2/ipc'
};

class CastDeviceEmulator {
  constructor(options = {}) {
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
  loadScenario(scenarioFile) {
    if (!jsonSchemaValidator.validate(require('../schemas/scenario.json'), scenarioFile)) {
      throw new Error('Invalid scenario schema!');
    }
    this.recordedMessages = scenarioFile.timeline;
  }

  /**
   * Startup the emulator
   */
  start(callback) {
    this.wss = new WebSocket.Server(
      {
        port: serverConfig.port,
        path: serverConfig.path
      },
      /**
       * When WebSocket server start listening,
       * we're going to listen to connection event as well.
       */
      (function onListeningCallback() {
        this.wss.on('connection', this._webSocketConnectionHandler);
        if (!this.options.silent) {
          log(`Established a websocket server at port ${serverConfig.port}`);
          log('Ready for Chromecast receiver connections..');
        }
        if (callback) callback();
      }).bind(this)
    );
  }

  /**
   * Stop handling events from WebSocket server
   */
  stop() {
    this.wss.removeAllListeners('message');
    this.wss.removeAllListeners('connection');
  }

  /**
   * Close the WebSocket server
   */
  close(callback) {
    if (!this.wss) {
      log('There is no websocket existing.');
      return;
    }
    this.wss.close(() => {
      if (!this.options.silent) {
        log('Chromecast Device Emulator is closed.');
      }
      if (callback) callback();
    });
  }

  /**
   * Handle incoming WebSocket connections
   */
  _webSocketConnectionHandler(ws) {
    if (!this.options.silent) log('There is a cast client just connected.');
    /**
     * Listen to message events on each socket connection
     */
    ws.on('message', this._webSocketMessageHandler);
    /**
     * Iterate over the recorded messages
     * and set a triggering timer for every single message.
     */
    this.recordedMessages.map(m => {
      // FIXME: Validate format before send it
      const sendRecordedMessage = () => {
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
  _webSocketMessageHandler(message) {
    log(chalk.green('<<'), message);
  }
}

module.exports = CastDeviceEmulator;
