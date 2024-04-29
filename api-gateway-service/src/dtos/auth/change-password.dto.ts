// change-password.dto.ts

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  currentPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;

  @IsNotEmpty()
  @IsEmail()
  email: string; // Or email: string
}
