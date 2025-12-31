import mongoose from "mongoose";


// we need to check the scima first before creating the model which data is required if no filled it will give error message

// note schema is just a interface of the data structure that we going to store in the database
// after you create the schema you need to create the model
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        minlength:2,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true, // clear space before and after email
        unique:true, // email must be unique can not duplicate
        lowercase:true, // email must be lowercase
        match:[/\S+@\S+\.\S+/, "Please fill a valid email address"], // email format example yeakhaily@gmail.com
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:6,
    },
}, {timestamps:true} // it will create createdAt and updatedAt fields automatically
);

// note model name must be start with capital letter
const User = mongoose.model("User", userSchema); // creating user model 

// dont forget to export the model
export default User;