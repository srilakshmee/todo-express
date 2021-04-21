import { EntityRepository, Repository} from 'typeorm';
import { User } from '../entities/user.entity'; 

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getRegisteredUsers(): Promise<Partial<User[]>> {
        const res = await this.find({    
        })
        console.log(res)
    return res;
    }
    async getUser( name:string, pwd:string): Promise<Partial<User>> {
        const res = await this.findOne({
            where: { name : name, password: pwd }
        })
        console.log(res)
        return res;
    }
    async getUserById( id:number): Promise<Partial<User>> {
        const res = await this.findOne({
            where: { id : id }
        })
        return res;
    }
    async getUserByEmail( email:string): Promise<User> {
        const res = await this.findOne({
            where: { email : email}
        })
        return typeof(res) == "undefined"  ? null : res;
    }
    async addUser(user: Partial<User>)  {
        const res = await this.insert({
             name: user.name , email: user.email , password: user.password
        })
        return res;
    }

}