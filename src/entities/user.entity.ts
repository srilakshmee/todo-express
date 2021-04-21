import { Column, Entity , PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Todo } from './todo.entity';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;
    @Column({
        name: 'name',
        type: 'varchar',
        length: 25,
    })
    name: string;
    @Column({
        name: 'password',
        type: 'varchar',
        length: 25,
    })
    password: string;
    @Column({
        name: 'email',
        type: 'varchar',
        length: 25,
    })
    email: string;

    @OneToMany(type => Todo, todo => todo.id) todos: Todo[];  
}