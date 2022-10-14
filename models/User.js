// Import Dependencies
import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addressSchema } from "./Address.js"
import crypto from "crypto";
 

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:[15,'First Name should be under 40 characters.']
    },
    lastName:{
        type:String,
        required:true,
        maxlength:[15,'Last Name should be under 40 characters.']
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        validate:[validator.isEmail,'Please enter email in correct format'],
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        match:/^\d{3}(-|\s)\d{3}(-|\s)\d{4}$|^\d{10}$|^1\s\d{3}(-|\s)\d{3}(-|\s)\d{4}$|^(1\s?)?\(\d{3}\)(\s|\-)?\d{3}\-\d{4}$/

    },
    address:addressSchema
},
{
    timestamps:true
})


// create and return jwt token
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}


const User = mongoose.model("User",userSchema);
export default User;