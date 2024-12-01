import { Body, Controller, Get, Post, UseGuards, Request, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response as Res } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private configService: ConfigService) {
  }
  
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Response() res: Res) {
    const jwtToken = await this.authService.login(loginDto.login, loginDto.password);
    const frontendDomain = this.configService.get('FRONTEND_DOMAIN');
    
    res.cookie(
      'token',
      jwtToken,
      {
        httpOnly: true,
        domain: frontendDomain,
      },
    )
      .json({ message: 'Success authorization' });
  }
  
  @Post('registration')
  async registration(@Body() registrationDto: RegistrationDto, @Response() res: Res) {
    const data = await this.authService.registration(registrationDto);
    
    const jwtToken = await this.authService.login(data.login, data.password);
    const frontendDomain = this.configService.get('FRONTEND_DOMAIN');
    
    res.cookie(
      'token',
      jwtToken,
      {
        httpOnly: true,
        domain: frontendDomain,
      },
    )
      .json({ message: 'Success registration' });
  }
  
  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }
}
