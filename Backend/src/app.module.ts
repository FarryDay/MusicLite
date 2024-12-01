import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
      
    }),
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {
}
