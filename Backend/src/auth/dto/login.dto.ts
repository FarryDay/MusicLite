import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(6)
  login: string;
  
  @IsString()
  @Length(6)
  password: string;
}