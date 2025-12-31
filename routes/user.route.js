import Router from 'express';
import { getUsers, getUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authMiddleware, getUser);

userRouter.post('/', (req, res) => res.send({title : 'creates user'}));

userRouter.put('/:id', (req, res) => res.send({title : 'updates user'}));

userRouter.delete('/:id', (req, res) => res.send({title : 'deletes user'}));

export default userRouter;
