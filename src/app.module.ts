import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Tag } from './tags/tags.entity';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-23-23-151-191.compute-1.amazonaws.com',
      database: 'd3b45h24t01uhi',
      port: 5432,
      username: 'pcdoljvshzrotx',
      password:
        '13cedea097fb079b4d7dea12bcbeb334288d19edc35d6f4dd5ebd45d7cb796f4',
      url: 'postgres://pcdoljvshzrotx:13cedea097fb079b4d7dea12bcbeb334288d19edc35d6f4dd5ebd45d7cb796f4@ec2-23-23-151-191.compute-1.amazonaws.com:5432/d3b45h24t01uhi      ',
      entities: [User, Tag],
      synchronize: true,
    }),
    UsersModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
