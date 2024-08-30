import { Module } from '@nestjs/common';
import { SwapsService } from './swaps.service';
import { SwapsController } from './swaps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swap } from './entities/swap.entity';
import { ExchangeShelf } from 'src/exchange-shelf/entities/exchange-shelf.entity';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Swap, ExchangeShelf, User])],
  controllers: [SwapsController],
  providers: [SwapsService],
})
export class SwapsModule {}
