/**
 * This file will
 * 1. Polyfills environment variables when receiver app is NOT running on Google Cast devices.
 * 2. Overrides environment variables when receiver app is running on Google Cast devices,
 *  which will forces receiver app to communicate sender with WebSocket, instead of built-in JavaScript object;
 *  So that we can sniff IPC messages between sender and receiver app.
 *
 * Note that you don't need to add this polyfill file in production,
 *  this polyfill will be only needed in developement.
 */
(function(windowObject) {
  if (!windowObject) return;
  windowObject.cast = windowObject.cast || {};
  windowObject.cast.__platform__ = {};
})(window);
