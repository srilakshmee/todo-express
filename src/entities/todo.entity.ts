import { Column, Entity , PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('todo')
export class Todo{
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;
    @Column({
        name: 'item',
        type: 'varchar',
        length: 25,
    })
    item: string;
    @Column({
        name: 'description',
        type: 'varchar',
        length: 25,
    })
    desc: string;
    @Column({
        name: 'status',
        type: 'char',
    })
    status: string;
    @Column({
        name: 'user_id',
        type: 'int',
    })
    user_id: number;
    
    //@ManyToOne(type => User, user => user.id) user: User; 

}