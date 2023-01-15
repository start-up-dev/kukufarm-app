export interface IClientToServerEvents {
  SEND_MESSAGE: (circleID: string, text: string) => void;
}
