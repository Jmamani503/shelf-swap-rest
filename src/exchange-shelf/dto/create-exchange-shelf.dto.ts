import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { BookCondition } from "../entities/book-condition.enum";
import { ExchangeStatus } from "../entities/exchange-status.enum";

export class CreateExchangeShelfDto {

    @IsEnum(BookCondition)
    book_condition: BookCondition;
    @IsEnum(ExchangeStatus)
    exchange_status: ExchangeStatus = ExchangeStatus.AVAILABLE;
    @IsUUID()
    @IsNotEmpty()
    user_id: string
    @IsUUID()
    @IsNotEmpty()
    book_id: string      
}
