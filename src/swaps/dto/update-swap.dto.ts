import { PartialType } from '@nestjs/mapped-types';
import { CreateSwapDto } from './create-swap.dto';
import { SwapStatus } from '../entities/swap-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateSwapDto{
    
    @IsEnum(SwapStatus)
    status: SwapStatus
}
