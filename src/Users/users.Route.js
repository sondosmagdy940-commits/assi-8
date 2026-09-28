import {Router}from 'express';
import { createUser, deletedUser, getUserById, Loggin, updateUser } from './users.controller.js';
const userRouter= Router();

userRouter.post('/signup',createUser);
userRouter.post('/loggin',Loggin);

userRouter.patch('/update/:id',updateUser);

userRouter.delete('/delete/:id',deletedUser);

userRouter.get('/get-user/:id',getUserById);
export default userRouter;