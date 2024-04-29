import { IMessage } from 'src/interfaces/message.interface';

export class MessageMapper implements IMessage {
  public id: string;
  public message: string;

  constructor(message: string) {
    this.message = message;
  }
}
