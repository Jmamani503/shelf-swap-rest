import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExchangeShelfService } from './exchange-shelf.service';
import { CreateExchangeShelfDto } from './dto/create-exchange-shelf.dto';
import { UpdateExchangeShelfDto } from './dto/update-exchange-shelf.dto';

@Controller('exchange-shelf')
export class ExchangeShelfController {
  constructor(private readonly exchangeShelfService: ExchangeShelfService) {}

  @Post()
  create(@Body() createExchangeShelfDto: CreateExchangeShelfDto) {
    return this.exchangeShelfService.create(createExchangeShelfDto);
  }

  @Get()
  findAll() {
    return this.exchangeShelfService.findAll();
  }

  @Get('user/:id')
  findAllByUser(@Param('id') id: string){
    return this.exchangeShelfService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeShelfService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExchangeShelfDto: UpdateExchangeShelfDto) {
    return this.exchangeShelfService.update(id, updateExchangeShelfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeShelfService.remove(id);
  }
}
