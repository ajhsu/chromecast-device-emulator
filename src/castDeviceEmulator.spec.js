import CastDeviceEmulator from './castDeviceEmulator';
const { assert, expect } = require('chai');

describe('CastDeviceEmulator', () => {
  describe('#Methods', () => {
    it('should have expected public methods', () => {
      expect(CastDeviceEmulator).to.respondTo('loadScript');
      expect(CastDeviceEmulator).to.respondTo('start');
      expect(CastDeviceEmulator).to.respondTo('stop');
    });
  });
});
