import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate login credentials
  async validateUser(email: string, password: string): Promise<any> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);
    
    if (!user) {
      console.log('User not found:', normalizedEmail);
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Password mismatch for:', normalizedEmail);
      return null;
    }

    const { password: _pass, ...result } = user;
    return result;
  }

  // Login and generate JWT
  async login(user: any): Promise<any> {
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      userId: user.id,
    };
  }

  // Register new user
  async register(createUserDto: CreateUserDto): Promise<any> {
    const email = createUserDto.email.toLowerCase().trim();
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
      name: createUserDto.name,
    });

    const payload = { sub: newUser.id, email: newUser.email };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      userId: newUser.id,
    };
  }
}
