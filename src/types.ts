export type ChromecastMessage = {
    time: number 
    ipcMessage: any
}

declare global {
    interface Window {
      CDE?: {
        exportScenario?: (clearConsole?: boolean) => void
      }
      cast?: Record<string, any>
    }
  
    interface WebSocket {
      realSendFunc?: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void
    }
    
}