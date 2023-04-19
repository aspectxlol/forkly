import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO } from 'src/dto/createUserDto';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signup')
  async signup(@Body() body: createUserDTO) {
    const errors = await validateSync(plainToClass(createUserDTO, body));
    if (errors.length > 0) {
      const validationErrors = errors
        .map((error) => Object.values(error.constraints))
        .flat();
      throw new BadRequestException({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }
    return this.userService.createUser(body);
  }
}
