const WebSocket = require('ws');
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
    this._webSocketConnectionHandler = this._webSocketConnectionHandler.bind(
      this
    );
  }
  loadScenario(scenarioFile) {
    if (
      !jsonSchemaValidator.validate(
        require('../schemas/scenario.json'),
        scenarioFile
      )
    ) {
      throw new Error('Invalid scenario schema!');
    }
    this.recordedMessages = scenarioFile.timeline;
  }
  start(callback) {
    this.wss = new WebSocket.Server(
      {
        port: serverConfig.port,
        path: serverConfig.path
      },
      () => {
        // Starting to handle websocket connections
        this.wss.on('connection', this._webSocketConnectionHandler);
        if (!this.opt.silent) {
          console.log(
            `Chromecast Device Emulator established a websocket server at port ${serverConfig.port}`
          );
          console.log(
            'Chromecast Device Emulator is waiting for connections..'
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
      console.log('There is no websocket existing.');
      return;
    }
    this.wss.close(() => {
      if (!this.opt.silent) {
        console.log('Chromecast Device Emulator is closed.');
      }
      if (callback) callback();
    });
  }
  _webSocketConnectionHandler(ws) {
    if (!this.opt.silent) console.log('There is a cast client just connected.');
    // Registering for message handler
    ws.on('message', this._webSocketMessageHandler);
    // Setting-up recorded message callback
    this.recordedMessages.map(m => {
      const sendRecordedMessage = () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(m.ipcMessage);
        }
      };
      setTimeout(sendRecordedMessage, m.time);
    });
  }
  _webSocketMessageHandler(message) {
    //console.log('received: %s', message);
  }
}

export default CastDeviceEmulator;
