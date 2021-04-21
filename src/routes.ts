import * as express from "express";
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import todoRouter from './routes/todo.router';
const router = express.Router();

router.get("/ping" , (req,res) => {
    return res.send("Server is up and running");
} );

router.use("/users" , userRouter);
router.use("/auth" , authRouter);
router.use("/todo" , todoRouter);

export default router;