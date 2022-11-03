import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

  async find(name: string) {
    let result;
    if (name.length > 0) {
      result = await this.repo.find({ name });
    } else {
      result = await this.repo.find();
    }

    return result;
  }

  async updateName(id: string, name: string, user: number) {
    const tag = await this.repo.findOne(id, {
      relations: ['user'],
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (tag.user.id !== user) {
      throw new HttpException(
        'You can not modify this tag',
        HttpStatus.FORBIDDEN,
      );
    }

    tag.name = name;
    delete tag.user;
    return this.repo.save(tag);
  }

  async increaseMediaCount(id: string, user: number) {
    const tag = await this.repo.findOne(id, {
      relations: ['user'],
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (tag.user.id == user) {
      throw new HttpException(
        'You can not modify this tag',
        HttpStatus.FORBIDDEN,
      );
    }

    tag.media_count++;
    delete tag.user;
    return this.repo.save(tag);
  }

  async remove(id: string, user: number) {
    const tag = await this.repo.findOne(id, {
      relations: ['user'],
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (tag.user.id !== user) {
      throw new HttpException(
        'You can not delete this tag',
        HttpStatus.FORBIDDEN,
      );
    }
    delete tag.user;
    return this.repo.remove(tag);
  }
}
