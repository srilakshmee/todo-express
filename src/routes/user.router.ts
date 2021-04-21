import express from 'express';
import { getAllUsers ,registerUser  } from '../handlers';
const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/',registerUser);

export {userRouter as default};