import {Request, Response, NextFunction} from "express";
import { UserRepository } from '../repositories/user.repository';
import { getCustomRepository, UsingJoinColumnIsNotAllowedError } from 'typeorm';
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
var refreshTokens = [];

export const login =  async (req: Request , res: Response , next: NextFunction) => {
    const { name, password } = req.body;
    const userRepo = getCustomRepository(UserRepository);

    // Filter user from the users array by username and password
    const user = await userRepo.getUser(name,password );

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.name  , id: user.id}, accessTokenSecret, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ username: user.name , id: user.id}, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send({status: 403, message: 'Username or password incorrect'});
    }    
};

export const token = (req: Request , res: Response , next: NextFunction) => {
    const { token } = req.body;
    if (!token) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }
    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ username: user.name , id: user.id }, accessTokenSecret, { expiresIn: '20m' });
        res.json({
            accessToken
        });
    });
};

export const logout = async (req: Request , res: Response , next: NextFunction) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter( (t)=> t !=token  );

    res.send("Logout successful");
}

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            console.log(err)
            if (err) {
                return res.sendStatus(403);
            }
            console.log(user)

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};