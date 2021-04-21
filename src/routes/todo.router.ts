import express from 'express';
import { addTodo, getTodo , getTodos, updateTodo ,authenticateJWT, deleteTodo } from '../handlers';
const todoRouter = express.Router();

todoRouter.get('/', authenticateJWT, getTodos);
todoRouter.get('/:todo_id', authenticateJWT, getTodo);
todoRouter.post('/',authenticateJWT , addTodo);
todoRouter.put('/:todo_id',authenticateJWT, updateTodo);
todoRouter.delete('/:todo_id',authenticateJWT, deleteTodo);

export {todoRouter as default};