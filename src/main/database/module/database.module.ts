import * as sqlcipher from '@journeyapps/sqlcipher';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from '../../account/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'resources/my_encrypted_db.sqlite',
      driver: sqlcipher,
      key: 'your-secret-password',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export default class DatabaseModule {}
