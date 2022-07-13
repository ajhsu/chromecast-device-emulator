export function log(...params: any[]) {
  console.log('chromecast-device-emulator:', ...params);
}

export function warn(...params: any[]) {
  console.warn('chromecast-device-emulator:', ...params);
}

export function error(...params: any[]) {
  console.error('chromecast-device-emulator:', ...params);
}