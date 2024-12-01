import { BadRequestException, Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import type { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
  }
  
  async findOne(login: string): Promise<User | undefined> {
    return this.prisma.user
      .findUnique({ where: { login: login } })
      .catch(() => {
        throw new BadRequestException('Пользователь не найден');
      });
  }
  
  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data })
      .catch(() => {
        throw new BadRequestException('Ошибка создания пользователя');
      });
  }
}
