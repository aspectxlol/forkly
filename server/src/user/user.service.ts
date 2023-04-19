import { ConflictException, Injectable } from '@nestjs/common';
import { createUserDTO, createDiscordUserDTO } from 'src/dto/createUserDto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser({ username, name, email, password }: createUserDTO) {
    if (await this.prismaService.user.findUnique({ where: { email: email } }))
      throw new ConflictException('a user with this email already exist');
    const newUser = await this.prismaService.user.create({
      data: {
        username: username,
        name: name,
        email: email,
        password: await bcrypt.hashSync(password, 10),
        avatarUrl: `https://api.dicebear.com/6.x/thumbs/png?seed=${username}`,
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
    const newUser = await this.prismaService.user.create({
      data: {
        username: username,
        name: name,
        email: email,
        refreshToken,
        accessToken,
        avatarUrl: `https://api.dicebear.com/6.x/thumbs/png?seed=${username}`,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, ...result } = newUser;
    return result;
  }
}
