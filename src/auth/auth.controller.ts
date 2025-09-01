import { Body, Controller, Post, Request, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async Login(@Request() req: any) {
    console.log('AuthController - req.user:', req.user);
    const result = await this.authService.login(req.user);
    console.log('AuthController - authService.login result:', result);
    return result;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('AuthController - register DTO:', createUserDto);
      const user = await this.authService.register(createUserDto);
      console.log('AuthController - registered user:', user);
      return user;
    } catch (error) {
      console.error('AuthController - register error:', error);

      // Throw a more informative error
      throw new InternalServerErrorException(
        error.message || 'Registration failed',
      );
    }
  }
}
