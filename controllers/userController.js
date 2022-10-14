// Import Model
import User from "../models/User.js"
import Address from "../models/Address.js"

import { cookieToken } from "../utils/cookieToken.js";

// Making Promise
import bigPromise from "../middlewares/bigPromise.js"


// Adding Contact
export const addContact = bigPromise(async(req,res,next)=>{
    const {firstName,lastName,email,phoneNumber,address} = req.body;
    // Check for fields
    if(!firstName || !lastName || !email || !phoneNumber || !address){
        return res.status(400).json({
            success:false,
            message:"All the fields are required."
        })
    }
     // Check for existing user based on email
    const existingUser = await User.findOne({email:email})
    if(existingUser){
        return res.status(501).json({
            success:false,
            message:"Contact of this email already exists in Address Book !!"
        })
    }
    // Create Contact
    const user = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber
    })
    // Create Address and link it with user id
    const addr = await Address.create({
        userId:user._id,
        tag:address.tag,
        address1:address.address1,
        address2:address.address2,
        city:address.city,
        state:address.state,
        postalCode:address.postalCode
    })
    // Token generation 
    cookieToken(user,res,"Contact Added Successfully!");
})



// Add Many Contacts
export const addBulkContact = bigPromise(async(req,res,next)=>{  
    // Getting Contacts in form of array json 
    const { data } =req.body;

    // Inserting contacts one by one from array to database
    // Did not use insertMany because i have to link address with user id
    for (let index = 0; index < data.length; index++) {
        let element = data[index];
        console.log(element)
        const existingUser = await User.findOne({email:element.email})
        if(existingUser){
            return res.status(501).json({
                success:false,
                message:`Contact of this email : ${element.email} already exists in Address Book !!`
            })
        }
        
        let user = await User.create({
            firstName:element.firstName,
            lastName: element.lastName,
            email: element.email,
            phoneNumber: element.phoneNumber,
        })
        let addr = await Address.create({
            userId:user._id,
            tag:element.address.tag,
            address1:element.address.address1,
            address2:element.address.address2,
            city:element.address.city,
            state:element.address.state,
            postalCode:element.address.postalCode
        })

    }

    // Response
    res.status(201).json({
        success:true,
        message:`${data.length} Contacts Added Successfully !`
    })
    
})


// Update Contact By UserId
export const updateContactById = bigPromise(async(req,res,next)=>{
    console.log(req.body)

    // Creating data to update
    const newData = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber
    }

    // Updating data by finding the id
    const user = await User.findByIdAndUpdate(req.params.id,newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    // Response
    res.status(200).json({
        success:true,
        message:"Updated Contact Successfully !!",
        data:user
    })

})

// Update Contacts Address By UserID
export const updateAddressByUserId = bigPromise(async(req,res,next)=>{
    console.log(req.body)

    // Creating data to update
    const newData = {
        tag:req.body.tag,
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        state:req.body.state,
        postalCode:req.body.postalCode
    }

    // Updating data by finding the id
    // const address = await Address.findOneAndUpdate({userId:req.params.id})
    // console.log(address)
    const address = await Address.findOneAndUpdate({userId:req.params.id},newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })


    // Response
    res.status(200).json({
        success:true,
        message:"Updated Contact Successfully !!",
        data:address
    })

})


// Delete contact by id
export const deleteContactById = bigPromise(async(req,res,next)=>{

    // Find contact by id
    const user= await User.findById(req.params.id)
    console.log(user)

    // If no contact this will run
    if(!user){
        return res.status(401).json({
            success:false,
            message:"No user found with this id "
        })
    }

    // deleting contact
    await user.remove()

    // response
    res.status(200).json({
        success:true,
        message:"Contact Deleted Succesfully!",
        deletedContact:user
    })
})


// Fetch contact by id
export const fetchContactbyId = bigPromise(async(req,res,next)=>{
    // find contact by id
    const user= await User.findById(req.params.id)

    console.log(user)

    // if no user found by id
    if(!user){
        return res.status(401).json({
            success:false,
            message:"No user found with this id"
        })
    }

    // response
    res.status(200).json({
        success:true,
        data:user
    })
})

// fetch contacts based on query
export const fetchPhaseMatching = bigPromise(async(req,res,next)=>{
    // find all user
    const data=await User.find()
    // console.log(users)
    
    // filter queries
    const filters = req.query;

    // fetch filtered user based on query
    const filteredUsers = data.filter(user => {
        let isValid = true;
        for (const key in filters) {
          console.log(key, user[key], filters[key]);
          isValid = isValid && user[key] == filters[key];
        }
        return isValid;
      });
      res.send(filteredUsers);

})


// paginate
export const paginate = bigPromise(async(req,res,next)=>{
    // with the help of middleware paginatedResults will be appeared
    res.json(paginatedResults)
})








  