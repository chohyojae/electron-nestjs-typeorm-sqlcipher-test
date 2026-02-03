import { Injectable } from '@nestjs/common';
import { dialog } from 'electron';

@Injectable()
export default class AppService {
  constructor() {
    /* empty */
  }

  getHello(): string {
    return `Hello World! ${new Date().toString()}`;
  }

  promptMessage(message: string): void {
    void dialog.showMessageBox({
      title: 'Message from renderer:',
      message,
    });
  }
}
