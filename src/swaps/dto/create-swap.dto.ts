import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateSwapDto {

    @IsUUID()
    @IsNotEmpty()
    requester_user: string;
    @IsUUID()
    @IsNotEmpty()
    requested_user: string;
    @IsUUID()
    @IsNotEmpty()
    requested_book: string;
    @IsUUID()
    @IsNotEmpty()
    offered_book: string;

}
