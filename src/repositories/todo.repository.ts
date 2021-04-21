import { EntityRepository, Repository} from 'typeorm';
import { Todo } from '../entities/todo.entity'; 
import { User } from '../entities/user.entity'; 

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {

    async getTodos(user: User): Promise<Partial<Todo[]>> {
        const res = await this.find({    
            where : { user_id : user.id}
        })
    return res;
    }
    async getTodo(id: string): Promise<Partial<Todo>> {
        const res = await this.findOne(   
            id
        );
    return res;
    }
    async addTodo(todo: Partial<Todo>,user: Partial<User>)  {
        const res = await this.insert({
             item: todo.item , desc: todo.desc , status: 'O', user_id: user.id
        })
        return res;
    }
    async updateTodo(id , todo: Partial<Todo>)  {
        const res = await this.save( { id: id, 
            item : todo?.item,
             desc : todo?.desc,
             status : todo?.status
        })
        return res;
    }
    async deleteTodo(id )  {
        const res = await this.delete( { id: id
        })
        return res;
    }
}