import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }
  
  async login(login: string, pass: string): Promise<string> {
    const user = await this.userService.findOne(login);
    if (user?.password !== pass || !user) {
      throw new UnauthorizedException("Неверный логин или пароль пароль");
    }
    const { password, ...result } = user;
    
    return await this.jwtService.signAsync(result);
  }
  
  registration(data: RegistrationDto): Promise<User> {
    return this.userService.create(data);
  }
  
  async updateJwt(login: string) {
    const user = await this.userService.findOne(login);
    const { password, ...result } = user;
    
    const token = await this.jwtService.signAsync(result);
    let userData = null;
    try {
      userData = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret,
        },
      );
    } catch {
      throw new UnauthorizedException();
    }
    return { token, userData };
  }
  
  async getUpToDateData(login: string) {
    return await this.userService.findOne(login);
  }
}
