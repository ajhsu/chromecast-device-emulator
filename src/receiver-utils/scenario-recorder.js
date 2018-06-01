(function(windowObject) {
  if (!windowObject) return;

  /**
   * Hijack WebSocket class for IPC message recording
   */
  WebSocket.prototype.realSendFunc = WebSocket.prototype.send;
  WebSocket.prototype.send = function(data) {
    this.realSendFunc(data);
    this.addEventListener(
      'message',
      function(message) {
        if (message && message.data) {
          pushMessage(message.data);
        }
      },
      false
    );
    this.send = function(data) {
      this.realSendFunc(data);
    };
  };

  const startup = new Date().getTime();
  const messageQueue = [];

  function pushMessage(message) {
    const now = new Date().getTime();
    const elapsed = now - startup;
    messageQueue.push({
      time: elapsed,
      ipcMessage: message
    });
  }

  function exportScenario(clearConsole = true) {
    if (clearConsole) console.clear();
    console.log(
      JSON.stringify({
        timeline: messageQueue
      })
    );
  }

  windowObject.CDE = windowObject.CDE || {};
  windowObject.CDE.exportScenario = exportScenario;
})(window);
