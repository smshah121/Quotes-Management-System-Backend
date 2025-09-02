import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // use email instead of default username
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('🔍 LocalStrategy - email:', email);
    console.log('🔍 LocalStrategy - password:', password);

    const user = await this.authService.validateUser(email, password);
    console.log("🔍 LocalStrategy - result:", user);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }
}
