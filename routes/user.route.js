import Router from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({title : 'GETS all users'}));

userRouter.get('/id', (req, res) => res.send({title : 'GETS user id detail'}));

userRouter.post('/', (req, res) => res.send({title : 'creates user'}));

userRouter.put('/:id', (req, res) => res.send({title : 'updates user'}));

userRouter.delete('/:id', (req, res) => res.send({title : 'deletes user'}));

export default userRouter;
