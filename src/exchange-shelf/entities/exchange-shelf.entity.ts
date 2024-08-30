import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookCondition } from "./book-condition.enum";
import { ExchangeStatus } from "./exchange-status.enum";
import { User } from "src/users/user.entity";
import { Book } from "src/books/entities/book.entity";

@Entity('exchange-shelf')
export class ExchangeShelf {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    book_condition: BookCondition
    @Column()
    exchange_status: ExchangeStatus
    
    @ManyToOne(() => User, (user) => user.exchangeShelf)
    user: User
    @ManyToOne(() => Book, (book) => book.exchangeShelf)
    book: Book
}
