import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  media_count: number;
}
