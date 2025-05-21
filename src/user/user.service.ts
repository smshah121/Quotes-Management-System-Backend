import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPasword = await bcrypt.hash(createUserDto.password, 10);
    const users = this.userRepository.create({
      ...createUserDto,
    password: hashedPasword
    })
    return this.userRepository.save(users)
  }

  async findAll():Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({id});
  }

  async update(id:number, updateuserdto:UpdateUserDto):Promise<User|null>{
    const user= await this.userRepository.findOneBy({id});
    if(!user)return null;
    const updateUserData:Partial<User> = {... updateuserdto};
    if(updateuserdto.password){
      updateUserData.password=await bcrypt.hash(updateuserdto.password,10);
    }
    else{
    delete updateUserData.password};
      
      const updateuser=  this.userRepository.merge(user,updateUserData);
      return this.userRepository.save(updateuser);
    }
    

  async remove(id:number):Promise<User|null>{
    const user= await this.userRepository.findOneBy({id});
  
    if(!user) return null;
    else{
      await this.userRepository.remove(user);
      return user;
    }
  
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
