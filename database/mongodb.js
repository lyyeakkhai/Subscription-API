import mongoose from 'mongoose';
import { NODE_ENV, DB_URI } from '../config/env.js';

// we first check the environment variable DB_URI is set or not


if(!DB_URI){
    throw new Error('Please define the mongodb connection string in the DB_URI environment variable inside .env.<development/production>.local');
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`MongoDB Connected in ${NODE_ENV} mode`);
    } catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

export default connectToDatabase;