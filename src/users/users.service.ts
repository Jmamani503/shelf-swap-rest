import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(user: createUserDto){
        const userFound = await this.userRepository.findOne({
            where:[{
                username: user.username,
            },{
                email: user.email
            }]
        })
        if(userFound){
            return new HttpException('Username or email already exist', HttpStatus.BAD_REQUEST);
        }
        const newUser = this.userRepository.create(user);
        newUser.created_at = new Date();
        return this.userRepository.save(newUser);
    }

    findUsers(){
        return this.userRepository.find();
    }

    async findUser(id: string) {
        const userFound = await this.userRepository.findOne({
            where:{id}
        })
        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return userFound;
    }

    async updateUser(id: string, userUpdated: UpdateUserDto){
        const userFound = await this.userRepository.findOne({
            where:{id}
        })
        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const updatedUser = Object.assign(userFound, userUpdated);

        return this.userRepository.save(updatedUser);
    }

    async deleteUser(id: string){
        const userDeleted = await this.userRepository.delete({id});
        if (userDeleted.affected === 0) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return userDeleted;
    }
}