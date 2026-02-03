import { Module } from '@nestjs/common';

import AccountModule from '../../account/module/account.module';
import DatabaseModule from '../../database/module/database.module';
import AppController from '../controller/app.controller';
import AppService from '../service/app.service';

@Module({
  imports: [DatabaseModule, AccountModule],
  providers: [AppService],
  controllers: [AppController],
})
export default class AppModule {}
