import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeShelfDto } from './create-exchange-shelf.dto';

export class UpdateExchangeShelfDto extends PartialType(CreateExchangeShelfDto) {}
