
const express=require("express");
const doctorSchema=require("../models/model1.js");
const doctorRoute=express.Router();
const jwt=require("jsonwebtoken");
const middleware=require("../middleware.js");
const mongoose=require("mongoose");
doctorRoute.post("/sign-updoctor",async(req,res)=>
{
    try{
        const{name,email,password}=req.body;
        let exist=await doctorSchema.findOne({email})
        if(exist)
        {
            return res.status(400).send("User exists")
        }
        let newUser=new doctorSchema({
            name,
            email,
            password
        })
        await newUser.save();
        res.status(200).send("registered sucessfully")

    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send("Internal server error")

    }
})
doctorRoute.post("/doctor-login",async(req,res)=>
{
    try{
        const{email,password}=req.body;
        let exist=await doctorSchema.findOne({email});
        if(!exist)
        {
            return res.status(400).send("user not found");
        }
        if(exist.password!==password)
        {
            return res.status(400).send("Invalid Credentials");
        }
       
        let payload={
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload,"secret",{expiresIn:3600000},
        (err,token)=>{
            if(err) throw err;
            return res.json({token})
        }
        )
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")

    }
})
doctorRoute.get("/doctor-dashboard",middleware,async(req,res)=>{
    try{
        let exist =await doctorSchema.findById(req.user.id);
        if(!exist){
            return res.status(400).send("user not found");
        }
        res.json(exist);

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).send("Server error")
    }
})
module.exports=doctorRoute;