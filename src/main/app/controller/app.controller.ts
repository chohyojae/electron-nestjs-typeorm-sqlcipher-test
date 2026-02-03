import { Controller } from '@nestjs/common';
import { Ctx, Payload } from '@nestjs/microservices';
import { BrowserWindow } from 'electron';
import {
  HandleIPCMessage,
  HandleIPCMessageWithResult,
  type IPCContext,
} from 'nestjs-electron-ipc-transport';

import AppService from '../service/app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @HandleIPCMessageWithResult('app/hello')
  hello(): string {
    console.log('Hello from renderer!');
    return this.appService.getHello();
  }

  @HandleIPCMessage('app/prompt')
  prompt(@Payload() data: string): void {
    this.appService.promptMessage(data);
  }

  @HandleIPCMessage('app/maximize')
  maximize(@Ctx() ctx: IPCContext): void {
    BrowserWindow.fromWebContents(ctx.evt.sender)?.maximize();
  }

  @HandleIPCMessage('app/unmaximize')
  unmaximize(@Ctx() ctx: IPCContext): void {
    BrowserWindow.fromWebContents(ctx.evt.sender)?.unmaximize();
  }

  @HandleIPCMessage('app/minimize')
  minimize(@Ctx() ctx: IPCContext): void {
    BrowserWindow.fromWebContents(ctx.evt.sender)?.minimize();
  }

  @HandleIPCMessage('app/close')
  close(@Ctx() ctx: IPCContext): void {
    BrowserWindow.fromWebContents(ctx.evt.sender)?.close();
  }
}
