import CastDeviceEmulator from './index';
import WebSocket from 'ws';
import Ajv from 'ajv';

const jsonSchemaValidator = new Ajv();
const { assert, expect } = require('chai');

describe('CastDeviceEmulator', function() {
  describe('Methods', function() {
    it('should have expected public methods', function() {
      expect(CastDeviceEmulator).to.respondTo('loadScript');
      expect(CastDeviceEmulator).to.respondTo('start');
      expect(CastDeviceEmulator).to.respondTo('stop');
    });
  });
  describe('WebSocket basic operations', function() {
    it('should respond to websocket connection', function(done) {
      this.timeout(30 * 1000);

      const opt = {
        silent: true
      };
      const emulator = new CastDeviceEmulator(opt);
      emulator.loadScript(require('../recorded-scripts/unit-testing.json'));
      emulator.start();

      // Trying to mimic client behavior
      const wsc = new WebSocket('ws://localhost:8008/v2/ipc');
      wsc.on('open', function open() {
        // Emit start-up messages once websocket connection is established.
        const MESSAGE = {
          READY: '{"namespace":"urn:x-cast:com.google.cast.system","senderId":"SystemSender","data":"{"type":"ready","statusText":"Ready to play","activeNamespaces":["urn:x-cast:com.example.cast.custom","urn:x-cast:com.google.cast.broadcast","urn:x-cast:com.google.cast.media","urn:x-cast:com.google.cast.inject"],"version":"2.0.0","messagesVersion":"1.0"}"}',
          START_HEARTBEAT: '{"namespace":"urn:x-cast:com.google.cast.system","senderId":"SystemSender","data":"{"type":"startheartbeat","maxInactivity":10}"}',
          MEDIA_STATUS: '{"namespace":"urn:x-cast:com.google.cast.media","senderId":"*:*","data":"{"type":"MEDIA_STATUS","status":[],"requestId":0}"}'
        };
        wsc.send(MESSAGE.READY);
        wsc.send(MESSAGE.START_HEARTBEAT);
        wsc.send(MESSAGE.MEDIA_STATUS);
      });
      wsc.on('message', function incoming(message, flags) {
        // console.log('wsc received:', message);
        const incomingMessageObject = JSON.parse(message);
        const dataProperty = JSON.parse(incomingMessageObject.data);
        const typeProperty = dataProperty.type;

        // Every incoming IPC messages should match expected json-schema
        expect(
          jsonSchemaValidator.validate(
            require('../schemas/ipc-message.json'),
            incomingMessageObject
          )
        ).to.be.true;

        console.log('Received an event:', typeProperty);
        // Client did received QUEUE_LOAD message from emulator
        if (typeProperty.toUpperCase() === 'QUEUE_LOAD') {
          done();
        }
      });
    });
  });
});
