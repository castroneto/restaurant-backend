import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest',
      password: 'Nest@2021',
      database: 'example',
      entities: [
        User
      ],
      synchronize: true,
    }),
    UsersModule
  ]
})
export class AppModule {}
