import { Body, Controller, Post, Request, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    const result = await this.authService.login(req.user);
    return result;
  }

  // Register
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw new InternalServerErrorException(error.message || 'Registration failed');
    }
  }
}
