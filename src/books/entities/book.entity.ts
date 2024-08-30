import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./genre.enum";
import { ExchangeShelf } from "src/exchange-shelf/entities/exchange-shelf.entity";
import { Swap } from "src/swaps/entities/swap.entity";

@Entity('books')
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    title: string
    @Column()
    author: string
    @Column({
        type: "simple-array"
    })
    genres: Genre[]
    @Column()
    cover_image: string
    @Column()
    created_at: Date
    @Column()
    updated_at: Date

    @OneToMany(() => ExchangeShelf, (exchangeShelf) => exchangeShelf.book)
    exchangeShelf: ExchangeShelf[]
    
    // @OneToMany(() => Swap, (requested_swaps) => requested_swaps.requested_book)
    // requested_swaps: Swap[]
}
