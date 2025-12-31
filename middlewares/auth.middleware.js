import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import { JWT_SECRET } from "../config/env.js";


const authMiddleware = async (req, res, next) => {

    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({
            message:"unauthorized"
        })

        const decode = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decode.userID);

        if(!user){
            return res.status(401).json({
                message: "unauthorized"
            });
        }

        req.user = user;

        next();

    }catch (error){
        res.status(401).json({
            message: "unauthorized access",
            error: error.message
        });
    }

}

export default authMiddleware;