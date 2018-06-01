const CastDeviceEmulator = require('./');
const WebSocket = require('ws');
const Ajv = require('ajv');

const jsonSchemaValidator = new Ajv();
const {
  assert,
  expect
} = require('chai');

describe('CastDeviceEmulator', function () {
  describe('Methods existance', function () {
    it('should have expected public methods', function () {
      expect(CastDeviceEmulator).to.respondTo('loadScenario');
      expect(CastDeviceEmulator).to.respondTo('start');
      expect(CastDeviceEmulator).to.respondTo('stop');
    });
  });
  describe('.loadScenario()', function () {
    it("should fail when doesn't fit json schema", function (done) {
      this.timeout(30 * 1000);
      var falsyScenarioObject = {
        notATimeline: [{
          notTime: 6722,
          notIpcMessage: '{"data":"{\\"applicationId\\":\\"ABCD1234\\",\\"applicationName\\":\\"Testing App\\",\\"closedCaption\\":{},\\"deviceCapabilities\\":{\\"bluetooth_supported\\":false,\\"display_supported\\":true,\\"hi_res_audio_supported\\":false},\\"launchingSenderId\\":\\"aaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.ff:com.example.android-000\\",\\"messagesVersion\\":\\"1.0\\",\\"sessionId\\":\\"d111111b-2222-3333-4444-55d5e5eebc5b\\",\\"type\\":\\"ready\\",\\"version\\":\\"1.22.78337\\"}","namespace":"urn:x-cast:com.google.cast.system","senderId":"SystemSender"}'
        }]
      };
      const emulator = new CastDeviceEmulator();
      const badFunction = () => {
        emulator.loadScenario(falsyScenarioObject);
      };
      expect(badFunction).to.throw(Error);
      done();
    });
  });
  describe('.close()', function () {
    it('should close websocket server properly', function (
      done
    ) {
      this.timeout(30 * 1000);

      const scenario = require('../examples/scenarios/example.json');

      const emulator1 = new CastDeviceEmulator();
      const emulator2 = new CastDeviceEmulator();

      emulator1.loadScenario(scenario);
      emulator2.loadScenario(scenario);

      // Well, I just don't want install promise-related packages..
      emulator1.start(function () {
        emulator1.close(function () {
          emulator2.start(function () {
            emulator2.close(done);
          });
        });
      });
    });
  });
  describe('WebSocket basic operations', function () {
    it('should respond to websocket client connection', function (done) {
      this.timeout(30 * 1000);

      const emulator = new CastDeviceEmulator({
        silent: true
      });
      emulator.loadScenario(require('../examples/scenarios/example.json'));
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
          emulator.close(done);
        }
      });
    });
  });
});