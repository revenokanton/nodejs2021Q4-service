import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class LoginDto extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
