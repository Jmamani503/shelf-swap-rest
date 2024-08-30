import { Module } from '@nestjs/common';
import { ExchangeShelfService } from './exchange-shelf.service';
import { ExchangeShelfController } from './exchange-shelf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeShelf } from './entities/exchange-shelf.entity';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ExchangeShelf,Book,User])],
  controllers: [ExchangeShelfController],
  providers: [ExchangeShelfService],
})
export class ExchangeShelfModule {}
