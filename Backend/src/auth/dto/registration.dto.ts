import { IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegistrationDto extends LoginDto{
  @IsString()
  @Length(4)
  username: string
}