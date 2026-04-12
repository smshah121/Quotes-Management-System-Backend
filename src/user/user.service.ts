import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>
  ){
  }
  async create(createUserDto: CreateUserDto): Promise<User> {


    let hashedPassword: string | undefined = undefined;

  if (createUserDto.password) {
    hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  }

    const user = this.UserRepo.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
      password: hashedPassword
    })

    return this.UserRepo.save(user)
  }

  findAll():Promise<User[]> {
    return this.UserRepo.find()
  }

  findOne(id: number):Promise<User | null> {
    return this.UserRepo.findOneBy({id})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepo.findOneBy({id})
    if(!user) return null;
    if(updateUserDto.password){
      updateUserDto.password = await bcrypt.hash(updateUserDto.password ,10)
    }
    else {
      delete updateUserDto.password
    }
    const update = await this.UserRepo.merge(user,updateUserDto)
    return this.UserRepo.save(user)

  }

  async remove(id: number) {
    const user = await this.UserRepo.findOneBy({id})
    if(!user) return null;
    else {
      await this.UserRepo.remove(user)
      return user
    }
  }

  async findByEmail(email : string){
    return this.UserRepo.findOne({where: {email}})
  }

  async findById(id:number){
    return this.UserRepo.findOne({where: {id}})
  }
}
