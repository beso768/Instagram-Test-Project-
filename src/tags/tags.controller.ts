import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tag.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './../users/decorators/current-user.decorator';
import { User } from './../users/user.entity';
import { UpdateTagDto } from './dtos/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getTags(@Query('name') name: string) {
    return this.tagsService.find(name);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createTag(@Body() body: CreateTagDto, @CurrentUser() user: User) {
    const Tag = await this.tagsService.create(body, user);
    return Tag;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateTag(
    @Param('id') id: string,
    @Body() body: UpdateTagDto,
    @CurrentUser() user: number,
  ) {
    return this.tagsService.updateName(id, body.name, user);
  }

  @Patch('/increase/:id')
  @UseGuards(AuthGuard)
  increaseMediaCount(@Param('id') id: string, @CurrentUser() user: number) {
    return this.tagsService.increaseMediaCount(id, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  removeTag(@Param('id') id: string, @CurrentUser() user: number) {
    return this.tagsService.remove(id, user);
  }
}
