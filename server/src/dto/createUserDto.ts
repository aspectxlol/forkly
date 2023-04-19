import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class createUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;
}

// class address

export class createDiscordUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
