import { ForbiddenException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { configService } from '../config/config.service';

@Injectable()
export class LoginService {
  constructor(private readonly userService: UserService) {}

  async login({ login, password }: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findByLogin(login);

    if (!user) {
      throw new ForbiddenException('No  such user exists.');
    }

    const { password: userPassword, id: userId } = user;

    const isValid = await bcrypt.compare(password, userPassword);

    if (!isValid) {
      throw new ForbiddenException(`Incorrect password.`);
    }

    const token = jwt.sign({ userId, login }, configService.getSecret());

    return { token };
  }
}
