const WebSocket = require('ws');

class CastDeviceEmulator {
  constructor() {
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
  loadScript(messages) {
    this.recordedMessages = messages;
  }
  start() {
    if (!this.wss) {
      throw new Error('WebSocket was not ready.');
    }
    this.wss.once('message', this._webSocketMessageHandler);
    this.wss.once('connection', this._webSocketConnectionHandler);
  }
  stop() {
    this.wss.removeAllListeners('message');
    this.wss.removeAllListeners('connection');
  }
  _webSocketConnectionHandler(ws) {
    console.log('There is a cast client just connected.');
    this.recordedMessages.map(m => {
      const sendRecordedMessage = () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(m.message);
        }
      };
      setTimeout(sendRecordedMessage, m.time);
    });
  }
  _webSocketMessageHandler(message) {
    console.log('received: %s', message);
  }
}

export default CastDeviceEmulator;
