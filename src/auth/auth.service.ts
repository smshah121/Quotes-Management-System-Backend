import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService:JwtService
  ){}
  async validateUser(email:string, password:string):Promise<any>{
    const users = await this.userService.findByEmail(email);
    if(users && await bcrypt.compare(password,users.password)){
      const {password, ...result} = users
      return result
    }
    return null
  

  }

  async validateUserById(id:number){
    return this.userService.findById(id)
  }

  async getProfile(id:number){
    const user = await this.userService.findById(id);
    if (!user) throw new Error('User not found');

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? 'Unknown User', // <-- make sure name is returned
  };

  }
  async login(user:any){
    const payload = {username: user.email, sub:user.id}
    return {
      access_token: this.jwtService.sign(payload),
      id:user.id
    }
  }

 async googleLogin(googleUser: { email: string; name: string }): Promise<{ access_token: string; id: number }> {
  // 1. Check if user exists
  let user = await this.userService.findByEmail(googleUser.email);

  // 2. If not, create user
  if (!user) {
    user = await this.userService.create({
      name: googleUser.name,
      email: googleUser.email,
    });
  } else if (!user.name) {
    // 3. If user exists but name is missing, update it
    user = await this.userService.update(user.id, { name: googleUser.name });
  }

  if (!user) throw new Error("Unable to create or find Google user");

  // 4. Generate JWT
  const payload = { username: user.email, sub: user.id };
  return {
    access_token: this.jwtService.sign(payload),
    id: user.id,
  };
}



  async register(createUserDto:CreateUserDto):Promise<{id:number,access_token:string}>{
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if(existingUser) {
      throw new ConflictException("Email already in use.");
    }
    const newUser = await this.userService.create(createUserDto),
    payload = {username: newUser.email, sub: newUser.id}
    return {
      access_token: this.jwtService.sign(payload),
      id: newUser.id
    }
  }
}