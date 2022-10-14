// Import Dependencies
import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const addressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
    },
    tag:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required:true,
        maxlength:[50,'Address1 length must below 30.']
    },
    address2:{
        type:String,
        maxlength:[50,'Address2 length must below 30.']
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    postalCode:{
        type:Number,
        match:/^[1-9][0-9]{5}$/
    },
    

},
{
    timestamps:true
})





const Address = mongoose.model("Address",addressSchema);
export default Address;