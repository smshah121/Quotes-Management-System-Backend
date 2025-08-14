import { IsString, IsEmail, MinLength, MaxLength, IsOptional} from 'class-validator';
export class UpdateUserDto {
    @IsOptional()
     @IsString()
      name?: string;

      @IsOptional()
      @IsEmail()
      email?: string;
      
      @IsOptional()
      @IsString()
      @MinLength(6)
      @MaxLength(20)
      password?: string; 
}
