import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = request.cookies.token || this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      let userData = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret,
        },
      );
      
      const user = await this.authService.getUpToDateData(userData.login);
      
      const jwtCreateTS = userData.iat * 1000 + 1000 * 60 * 60 * 3;
      const userUpdateTS = new Date(user.updateAt).valueOf();
      
      if (userUpdateTS > jwtCreateTS) {
        const frontendDomain = this.configService.get('FRONTEND_DOMAIN');
        const data = await this.authService.updateJwt(userData.login);
        userData = data.userData;
        response.cookie('token',
          data.token,
          {
            httpOnly: true,
            domain: frontendDomain,
          });
      }
      request['user'] = userData;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
