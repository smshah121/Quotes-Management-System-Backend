import { IsString, IsEmail, MinLength, MaxLength} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;  // ✅ This must exist!

  
}
