import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tags.entity';
import { User } from './../users/user.entity';
import { CreateTagDto } from './dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private repo: Repository<Tag>) {}

  async create(body: CreateTagDto, user: User) {
    const tags = await this.repo.find({ name: body.name });
    if (tags.length > 0) throw new BadRequestException('Tag is already exist');

    const tag = this.repo.create({ ...body });
    tag.user = user;
    return this.repo.save(tag);
  }

  find(name: string) {
    return this.repo.find({ name });
  }
}
