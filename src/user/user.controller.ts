import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const users = await this.usersService.findOne(id);
    if(!users) throw new NotFoundException("User Not Found")
      return users;
  }

  async update(@Param('id')id:number,@Body()updateUserdto:UpdateUserDto):Promise<{message:string}>{
    const updated= await this.usersService.update(id,updateUserdto);
    if(!updated) throw new NotFoundException ('User not found on update');
    return {message:'User updated successfully'};

  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe)id:number):Promise<User|{message:string;deleteduserId:number}>{
    const deleted= this.usersService.remove(id);
    if(!deleted) throw new NotFoundException("User not found");
    return {message:"user deleted successfully",deleteduserId:id};
  }

}
