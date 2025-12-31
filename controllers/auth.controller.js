import { mongoose } from "mongoose";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";



// this is the function to create a new user
export const signUp = async (req, res, next) => {

    // this session have nothing to do with user session
    // it is a transaction session of mongoose
    // we do this because we want to perform atomic operation knowe as atomic update 
    // what it mean 
    // atomic operation is a series of operations that either all succeed or all fail together
    // so if one operation fail the whole transaction will be rolled back to the previous state
    // this is important to maintain data integrity and consistency especially when dealing with multiple related documents or collections 
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // goal in this function is to create user
        const { name, email, password } = req.body; // get user information from the request body

        // then we need to check if the user already exist in the database
        // in this case we need to use the User model (User prefer to User model from user.model.js)
        // why we find email rather than name because email must be unique but name can be duplicate
        const existUser = await User.findOne({ email });

        if(existUser){
            const error = new Error("User already exist with this email");
            error.statusCode = 409; // status code 409 for conflict already exist
            throw error;
        }

        // if user not exist we can create new user
        // but before we create user we need to hash the password for security reason
        // hashing is a one way function that convert plain text password to a fixed length string of characters
        // this is important to protect user password from being stolen in case of data breach
        const salt = await bcrypt.genSalt(10); // generate salt with 10 rounds
        const hashedPassword =  await bcrypt.hash(password, salt); // hash the password with the generated salt

        // then we can create a user 
        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword, // store the hashed password in the database
        }], { session }); // we need to pass the session to the create function to make it part of the transaction to make sure in case that something go wrong the user will not be created
        // why we create user inside an array because mongoose create function expect an array of documents when you use sessionif you dont use session you can just pass an object
        //the benefit of using session is that if something go wrong in the transaction the user will not be created in the database maintaining data integrity
        //and in the future if you want to create more related documents you can just add them to the same transaction session


        // if everything is fine we can commit the transaction

        // the we can generate token for the user to authenticate
        
        const token = jwt.sign({userID: newUser[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                user: newUser[0],
                token
            }
        });
    } catch(error) {
        // when somthing when wrong on the transaction we need to abort the transaction and end session immediately
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {

    const { email, password } = req.body;
        // first we need to check if the user exist
    try{
        const user = await User.findOne({ email });
        if(!user){
            const error = new Error("User does not exist");
            error.statusCode = 404;
            throw error;
        }
            

        // then we need to compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            const error = new Error("Invalid password");
            error.statusCode = 401; // unauthorized
            throw error;
        }

        // if everything is fine we can generate token for the user

    const token = jwt.sign({userID: user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    

    res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: {
            token,
            user
        }
    });

    }catch(error){
        return next(error);
    }

    
};

export const signout = async (req, res, next) => {
     
    
    try{

        res.status(200).json({
            success: true,
            message: "User signed out successfully",
        });
    } catch(error){
        return next(error);
    }


};