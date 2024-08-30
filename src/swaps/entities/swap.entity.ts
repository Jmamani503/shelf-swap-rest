import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SwapStatus } from "./swap-status.enum";
import { User } from "src/users/user.entity";
import { Book } from "src/books/entities/book.entity";

@Entity('swaps')
export class Swap {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    status: SwapStatus = SwapStatus.PENDING;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;

    @ManyToOne(() => User, (requester_user) => requester_user)
    requester_user: User;
    @ManyToOne(() => User, (requested_user) => requested_user)
    requested_user: User;
    @ManyToOne(() => Book, (requested_book) => requested_book)
    requested_book: Book;
    @ManyToOne(() => Book, (offered_book) => offered_book)
    offered_book: Book;
}
