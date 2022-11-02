import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  profile_pic_url: string;

  @Expose()
  username: string;
}
