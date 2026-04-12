import { Body, Controller, Post, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    const result = await this.authService.login(req.user);
    return result;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates Google OAuth2 login
  }

  // Google callback
  @Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleAuthRedirect(@Req() req, @Res() res: Response) {
  const tokenData = await this.authService.googleLogin(req.user);
  res.redirect(`https://peaceful-crisp-c5d1fb.netlify.app/oauth-success?token=${tokenData.access_token}`);
}

  // Register
 @Post("register")
  async register(@Body() createUserDto:CreateUserDto){
    return this.authService.register(createUserDto)
  }
}
