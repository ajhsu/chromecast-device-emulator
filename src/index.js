const WebSocket = require('ws');
const chalk = require('chalk');
const {
  log,
  error
} = require('./log');
const Ajv = require('ajv');
const jsonSchemaValidator = new Ajv();

const serverConfig = {
  port: 8008,
  path: '/v2/ipc'
};

class CastDeviceEmulator {
  constructor(opt = {}) {
    this.opt = opt;
    this.wss = null;
    this.recordedMessages = [];
    this._webSocketMessageHandler = this._webSocketMessageHandler.bind(this);
    this._webSocketConnectionHandler = this._webSocketConnectionHandler.bind(this);
  }
  loadScenario(scenarioFile) {
    if (!jsonSchemaValidator.validate(
        require('../schemas/scenario.json'),
        scenarioFile
      )) {
      throw new Error('Invalid scenario schema!');
    }
    this.recordedMessages = scenarioFile.timeline;
  }
  start(callback) {
    this.wss = new WebSocket.Server({
        port: serverConfig.port,
        path: serverConfig.path
      },
      () => {
        // Starting to handle websocket connections
        this.wss.on('connection', this._webSocketConnectionHandler);
        if (!this.opt.silent) {
          log(
            `Established a websocket server at port ${serverConfig.port}`
          );
          log(
            'Ready for Chromecast receiver connections..'
          );
        }
        if (callback) callback();
      }
    );
  }
  stop() {
    this.wss.removeAllListeners('message');
    this.wss.removeAllListeners('connection');
  }
  close(callback) {
    if (!this.wss) {
      log('There is no websocket existing.');
      return;
    }
    this.wss.close(() => {
      if (!this.opt.silent) {
        log('Chromecast Device Emulator is closed.');
      }
      if (callback) callback();
    });
  }
  _webSocketConnectionHandler(ws) {
    if (!this.opt.silent) log('There is a cast client just connected.');
    // Registering for message handler
    ws.on('message', this._webSocketMessageHandler);
    // Setting-up recorded message callback
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
  _webSocketMessageHandler(message) {
    log(chalk.green('<<'), message);
  }
}

module.exports = CastDeviceEmulator;