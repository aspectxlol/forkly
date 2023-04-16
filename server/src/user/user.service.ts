import { lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { ConflictException, Injectable } from '@nestjs/common';
import { createUserDTO, createDiscordUserDTO } from 'src/dto/createUserDto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser({ username, name, email, password }: createUserDTO) {
    if (this.prismaService.user.findUnique({ where: { email: email } }))
      throw new ConflictException('a user with this email already exist');
    const avatar = createAvatar(lorelei, {
      backgroundColor: ['#56e62e'],
    });
    const newUser = await this.prismaService.user.create({
      data: {
        username: username,
        name: name,
        email: email,
        password: await bcrypt.hashSync(password, 10),
        avatarUrl: await avatar.toDataUriSync(),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, ...result } = newUser;
    return result;
  }

  async createUserDiscord({
    username,
    name,
    email,
    accessToken,
    refreshToken,
  }: createDiscordUserDTO) {
    if (this.prismaService.user.findUnique({ where: { email: email } }))
      throw new ConflictException('a user with this email already exist');
    const avatar = createAvatar(lorelei, {
      backgroundColor: ['#56e62e'],
    });
    const newUser = await this.prismaService.user.create({
      data: {
        username: username,
        name: name,
        email: email,
        refreshToken,
        accessToken,
        avatarUrl: await avatar.toDataUriSync(),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, ...result } = newUser;
    return result;
  }
}
