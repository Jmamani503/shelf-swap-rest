import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() newUser: createUserDto){
        return this.userService.createUser(newUser);
    }

    @Get()
    getAllUsers(){
        return this.userService.findUsers();
    }

    @Get(':id')
    getOneUser(@Param('id') userId: string){
        return this.userService.findUser(userId);
    }

    @Patch(':id')
    updateUser(@Param('id') userId:string, @Body() userUpdated: UpdateUserDto){
        return this.userService.updateUser(userId, userUpdated);
    }

    @Delete(':id')
    deleteUser(@Param('id') userId: string){
        return this.userService.deleteUser(userId);
    }
}
