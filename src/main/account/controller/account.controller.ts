import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { HandleIPCMessageWithResult } from 'nestjs-electron-ipc-transport';

import User from '../entity/user.entity';
import UserService from '../service/user.service';

@Controller()
export default class AccountController {
  constructor(private readonly userService: UserService) {}

  @HandleIPCMessageWithResult('account/user/findAll')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @HandleIPCMessageWithResult('account/user/findOne')
  async findOne(@Payload() id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @HandleIPCMessageWithResult('account/user/create')
  async create(@Payload() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @HandleIPCMessageWithResult('account/user/remove')
  async remove(@Payload() id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
