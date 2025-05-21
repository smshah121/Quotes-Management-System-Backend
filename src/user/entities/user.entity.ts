import { Quote } from "src/quote/entities/quote.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    email: string


    @Column()
    password: string

    @OneToMany(()=> Quote, quote => quote.user)
    quotes: Quote[]


}
