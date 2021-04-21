import {Request, Response, NextFunction} from "express";
import { getCustomRepository, UsingJoinColumnIsNotAllowedError } from 'typeorm';
import { TodoRepository } from '../repositories/todo.repository';

export const getTodos =  async (req: Request , res: Response , next: NextFunction) => {
    const todoRepo = getCustomRepository(TodoRepository);
    const todos = await todoRepo.getTodos(req['user']);
    return res.send({
        "code": 200,
        "data": todos
    })
};
export const getTodo =  async (req: Request , res: Response , next: NextFunction) => {
    const todoRepo = getCustomRepository(TodoRepository);
    const todos = await todoRepo.getTodo(req.params.todo_id);
    return res.send({
        "code": 200,
        "data": todos
    })
};
export const addTodo =  async (req: Request , res: Response , next: NextFunction) => {
    const todoRepo = getCustomRepository(TodoRepository);
    const todos = await todoRepo.addTodo( {item: req.body.item, desc: req.body.desc} ,req['user']);
    return res.send({
        "code":200,
        "data":`Added todo`
    })
};

export const updateTodo =  async (req: Request , res: Response , next: NextFunction) => {
    const todoRepo = getCustomRepository(TodoRepository);
    const todo_item = {
        item: req.body?.item, desc: req.body?.desc, status: req.body?.status
    }
    const todos = await todoRepo.updateTodo( req.params.todo_id , todo_item );
    return res.send({
        "code":200,
        "data":`Upadate todo`
    })
};
export const completeTodo =  async (req: Request , res: Response , next: NextFunction) => {
    const todoRepo = getCustomRepository(TodoRepository);
    const todo_item = {
        status: 'C'
    }
    const todos = await todoRepo.updateTodo( req.params.todo_id , todo_item );
    return res.send({
        "code":200,
        "data":`Marked as done`
    })
};

export const deleteTodo =  async (req: Request , res: Response , next: NextFunction) => {
    const todoRepo = getCustomRepository(TodoRepository);
    
    const todos = await todoRepo.deleteTodo( req.params.todo_id );
    return res.send({
        "code":200,
        "data":`Deleted todo`
    })
};
