import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tag.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './../users/decorators/current-user.decorator';
import { User } from './../users/user.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getTags(@Query('name') name: string) {
    return this.tagsService.find(name);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() body: CreateTagDto, @CurrentUser() user: User) {
    const Tag = await this.tagsService.create(body, user);
    return Tag;
  }

  // @Delete('/:id')
  // removeUser(@Param('id') id: string, @CurrentUser() user: number) {
  //   if (user !== parseInt(id)) {
  //     throw new BadRequestException('You can not delete this account');
  //   }

  //   return this.usersService.remove(parseInt(id));
  // }
}
