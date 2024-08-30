import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Genre } from "../entities/genre.enum"

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string
    @IsString()
    @IsNotEmpty()
    author: string
    @IsEnum(Genre, { each: true })
    genres: Genre[]
    @IsString()
    @IsNotEmpty()
    cover_image: string
}
