import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExchangeShelfDto } from './dto/create-exchange-shelf.dto';
import { UpdateExchangeShelfDto } from './dto/update-exchange-shelf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeShelf } from './entities/exchange-shelf.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class ExchangeShelfService {

  constructor(
    @InjectRepository(ExchangeShelf) private readonly exchangeShelfRepository:Repository<ExchangeShelf>,
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    @InjectRepository(Book) private readonly bookRepositoty: Repository<Book>
  ){}

  async create(createExchangeShelfDto: CreateExchangeShelfDto) {
    const userFound = await this.userRepository.findOne({
      where:{id: createExchangeShelfDto.user_id}
    });
    if(!userFound) return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const bookFound = await this.bookRepositoty.findOne({
      where:{id: createExchangeShelfDto.book_id}
    });
    if(!bookFound) return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    
    const exchangeShelfFound = await this.exchangeShelfRepository.findOne({
      where: {
        user: { id: userFound.id },
        book: { id: bookFound.id }
      }
    });
    if (exchangeShelfFound) {
      return new HttpException('The book is already in your exchange shelf', HttpStatus.BAD_REQUEST);
    }
    const newExchangeShelf = this.exchangeShelfRepository.create({
      ...createExchangeShelfDto,
      user: userFound,
      book: bookFound,
    });
    return this.exchangeShelfRepository.save(newExchangeShelf);
  }

  findAll() {
    return this.exchangeShelfRepository.find({
      relations: {
          user: true,
          book: true
        },
  });
  }

  async findAllByUser(user_id: string){
    const userFound = await this.userRepository.findOne({
      where:{id: user_id}
    });
    if(!userFound) return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.exchangeShelfRepository.find({
      relations: {book: true},
      where: {
        user:{id : user_id} 
      }
    });
  }

  async findOne(id: string) {
    const exchangeShelfFound = await this.exchangeShelfRepository.findOne({
      where:{id}
    })
    if(!exchangeShelfFound){
      return new HttpException('ExchangeShelf not found', HttpStatus.NOT_FOUND);
    }
    return exchangeShelfFound;
  }

  async update(id: string, updateExchangeShelfDto: UpdateExchangeShelfDto) {
    const exchangeShelfFound = await this.exchangeShelfRepository.findOne({
      where:{id}
    });
    if (!exchangeShelfFound) {
      return new HttpException('ExchangeShelf not found', HttpStatus.NOT_FOUND);
    }
    const updatedExchangeShelf = Object.assign(exchangeShelfFound, updateExchangeShelfDto);
    return this.exchangeShelfRepository.save(updatedExchangeShelf);
  }

  async remove(id: string) {
    const exchangeShelfRemoved = await this.exchangeShelfRepository.delete({id});
    if(exchangeShelfRemoved.affected === 0){
      return new HttpException('ExchangeShelf not found', HttpStatus.NOT_FOUND);
    }
    return exchangeShelfRemoved;
  }
}
