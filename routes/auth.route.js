import {Router} from 'express';
import { signUp, signIn, signout } from '../controllers/auth.controller.js';

const AuthRoute = Router();

AuthRoute.post('/sign-up', signUp);
AuthRoute.post('/sign-in', signIn);
AuthRoute.post('/sign-out', signout);


export default AuthRoute;