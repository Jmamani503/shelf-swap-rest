import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>){}

  async create(createBookDto: CreateBookDto) {
    const bookFound = await this.bookRepository.findOne({
      where:{
          title: createBookDto.title,
          author: createBookDto.author
      }
    })
    if(bookFound){
      return new HttpException('Book by that author already exist', HttpStatus.BAD_REQUEST);
    }
    const newBook = this.bookRepository.create(createBookDto) 
    newBook.created_at = new Date();
    return this.bookRepository.save(newBook);
  }

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: string) {
    const bookFound = await this.bookRepository.findOne({
      where:{id}
    })
    if(!bookFound){
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return bookFound;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const bookFound = await this.bookRepository.findOne({
      where:{id}
    });
    if (!bookFound) {
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    const updatedBook = Object.assign(bookFound, updateBookDto);
    return this.bookRepository.save(updatedBook);
  }

  async remove(id: string) {
    const bookRemoved = await this.bookRepository.delete({id});
    if(bookRemoved.affected === 0){
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return bookRemoved;
  }
}
