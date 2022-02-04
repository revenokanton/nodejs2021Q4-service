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
    const { password: userPassword, id: userId } = await this.validateUser(
      login
    );

    await this.validatePassword(password, userPassword);

    const token = jwt.sign({ userId, login }, configService.getSecret());

    return { token };
  }

  async validateUser(login: string) {
    const user = await this.userService.findByLogin(login);

    if (!user) {
      throw new ForbiddenException('No  such user exists.');
    }

    return user;
  }

  async validatePassword(password: string, userPassword: string) {
    const isValid = await bcrypt.compare(password, userPassword);

    if (!isValid) {
      throw new ForbiddenException(`Incorrect password.`);
    }
  }
}
