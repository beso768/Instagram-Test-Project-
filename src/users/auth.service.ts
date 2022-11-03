import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(body: CreateUserDto) {
    // See if email is in use
    const users = await this.usersService.findByEmail(body.email);

    if (users) {
      throw new BadRequestException('email in use');
    }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(body, result);

    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
