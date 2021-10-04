import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {Exclude} from "class-transformer";
import { Task } from "src/task/model/entity";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

}