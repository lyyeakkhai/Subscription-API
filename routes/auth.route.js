import {Router} from 'express';

const AuthRoute = Router();

AuthRoute.post('/sign-up', (req, res) =>  res.send({title : 'Sign Up'}));
AuthRoute.post('/sign-in', (req, res) => res.send({title : 'Sign In'}));
AuthRoute.post('/sign-out', (req, res) => res.send({title : 'Sign Out'}));




export default AuthRoute;