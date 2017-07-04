const WebSocket = require('ws');

class CastDeviceEmulator {
  constructor(opt) {
    this.opt = opt;
    this.wss = new WebSocket.Server({
      port: 8008,
      path: '/v2/ipc'
    });
    this.recordedMessages = [];
    this._webSocketMessageHandler = this._webSocketMessageHandler.bind(this);
    this._webSocketConnectionHandler = this._webSocketConnectionHandler.bind(
      this
    );
  }
  loadScenario(scenarioFile) {
    this.recordedMessages = scenarioFile.timeline;
  }
  start() {
    if (!this.wss) {
      throw new Error('WebSocket was not ready.');
    }
    // Starting to handle websocket connections
    this.wss.on('connection', this._webSocketConnectionHandler);
    if (!this.opt.silent)
      console.log('Chromecast Device Emulator is waiting for connections..');
  }
  stop() {
    this.wss.removeAllListeners('message');
    this.wss.removeAllListeners('connection');
  }
  close() {
    this.wss.close(() => {
      if (!this.opt.silent)
        console.log('Chromecast Device Emulator is closed.');
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
