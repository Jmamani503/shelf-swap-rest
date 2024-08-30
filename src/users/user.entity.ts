import { UUID } from "crypto";
import { ExchangeShelf } from "src/exchange-shelf/entities/exchange-shelf.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users"})
export class User{
    
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({unique: true})
    username: string
    @Column({unique: true})
    email: string
    @Column()
    password: string
    @Column({type: 'datetime'})
    created_at: Date

    @OneToMany(() => ExchangeShelf, (exchangeShelf) => exchangeShelf.user)
    exchangeShelf: ExchangeShelf[]
}