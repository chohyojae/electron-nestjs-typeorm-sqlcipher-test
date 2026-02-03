import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AccountController from '../controller/account.controller';
import User from '../entity/user.entity';
import UserService from '../service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AccountController],
  providers: [UserService],
  exports: [UserService],
})
export default class AccountModule {}
