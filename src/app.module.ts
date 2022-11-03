import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tags.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cookieSession from 'cookie-session';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [User, Tag],
    }),
    UsersModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
