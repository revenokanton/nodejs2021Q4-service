import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule],
  controllers: [LoginController],
  providers: [LoginService, UserService],
})
export class LoginModule {}
