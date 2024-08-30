import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSwapDto } from './dto/create-swap.dto';
import { UpdateSwapDto } from './dto/update-swap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Swap } from './entities/swap.entity';
import { Repository } from 'typeorm';
import { ExchangeShelf } from 'src/exchange-shelf/entities/exchange-shelf.entity';
import { ExchangeStatus } from 'src/exchange-shelf/entities/exchange-status.enum';
import { User } from 'src/users/user.entity';

@Injectable()
export class SwapsService {

  constructor(
    @InjectRepository(Swap) private readonly swapRepositiry: Repository<Swap>,
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    @InjectRepository(ExchangeShelf) private readonly exchangeShelfRepository: Repository<ExchangeShelf>
  ){

  }

  async create(createSwapDto: CreateSwapDto) {
    const findRequestBook = await this.exchangeShelfRepository.findOne({
      relations:{
        book: true,
        user: true
      },
      where: { 
        book: {id: createSwapDto.requested_book},
        user: {id: createSwapDto.requested_user},
        exchange_status: ExchangeStatus.AVAILABLE
      }
    });
    if(!findRequestBook) throw new HttpException("The requested book is not available", HttpStatus.BAD_REQUEST)
    const findOfferedBook = await this.exchangeShelfRepository.findOne({
      relations:{
        book: true,
        user: true
      },
      where: {
        book: {id: createSwapDto.offered_book},
        user: {id: createSwapDto.requester_user},
        exchange_status: ExchangeStatus.AVAILABLE
      }
    });
    if(!findOfferedBook) throw new HttpException("The offered book is not available", HttpStatus.BAD_REQUEST)

    findOfferedBook.exchange_status = ExchangeStatus.IN_SWAP;
    this.exchangeShelfRepository.save(findOfferedBook);
    findRequestBook.exchange_status = ExchangeStatus.IN_SWAP;
    this.exchangeShelfRepository.save(findRequestBook);

    const newSwap = this.swapRepositiry.create({
      offered_book: findOfferedBook.book,
      requester_user: findOfferedBook.user,
      requested_book: findRequestBook.book,
      requested_user: findRequestBook.user
    });
    newSwap.created_at = new Date;
    newSwap.updated_at = new Date;

    return this.swapRepositiry.save(newSwap);
  }

  findAll() {
    return this.swapRepositiry.find({
      relations:{
        requested_book: true,
        requested_user: true,
        offered_book: true,
        requester_user: true
      }
    });
  }

  async findAllByUser(user_id: string){
    const userFound = await this.userRepository.findOne({
      where:{id: user_id}
    });
    if(!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.swapRepositiry.find({
      relations:{
        requested_book: true,
        requested_user: true,
        offered_book: true,
        requester_user: true
      },
      where:[{
        requested_user: {id:user_id}
      },{
        requester_user: {id:user_id}
      }]
    });
  }

  async findOne(id: string) {
    const findSwap = await this.swapRepositiry.findOne({
      relations:{
        requested_book: true,
        requested_user: true,
        offered_book: true,
        requester_user: true
      },
      where:{id}
    });
    if(!findSwap) throw new HttpException("Swap not found",HttpStatus.NOT_FOUND);

    return findSwap;
  }

  async update(id: string, updateSwapDto: UpdateSwapDto) {
    const findSwap = await this.swapRepositiry.findOne({
      relations:{
        requested_book: true,
        requested_user: true,
        offered_book: true,
        requester_user: true
      },
      where: {id}
    });
    if(!findSwap) throw new HttpException("Swap not found", HttpStatus.NOT_FOUND);

    const updatedSwap = Object.assign(findSwap, updateSwapDto);
    return this.swapRepositiry.save(updatedSwap);
  }

  remove(id: string) {
    return `This action removes a #${id} swap`;
  }
}
