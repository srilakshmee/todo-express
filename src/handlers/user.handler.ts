import {Request, Response, NextFunction} from "express";
import { UserRepository } from '../repositories/user.repository';
import { getCustomRepository, UsingJoinColumnIsNotAllowedError } from 'typeorm';
//import bcyrypt from 'bcrypt';

export const getAllUsers =  async (req: Request , res: Response , next: NextFunction) => {
    const userRepo = getCustomRepository(UserRepository);

    const users = await userRepo.getRegisteredUsers();
    return res.send({
        "code": 200,
        "data": users
    })
};

export const registerUser =  async (req: Request , res: Response , next: NextFunction) => {
    const userRepo = getCustomRepository(UserRepository);
    const email = req.body.email;
    const userExists = await userRepo.getUserByEmail(req.body.email);
    if( userExists ) {
        return res.send({
            "code": 910,
            "data":`User with email ${email} exists`
        })
    }
    //var hashedPassword = await bcyrypt.hashedPassword(req.body.password, 8);

    const resp = await userRepo.addUser( { name: req.body.name , password: req.body.password,
                    email :  req.body.email});
    return res.send({
        "code":200,
        "data":`Inserted user with id ${resp.raw.insertId}`
    })
};
