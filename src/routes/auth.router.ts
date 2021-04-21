import express from 'express';
import { login ,logout  } from '../handlers';
const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/logout',logout);

export {authRouter as default};