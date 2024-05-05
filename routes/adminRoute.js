
const express=require("express");
const adminSchema=require("../models/model4.js");
const patientRoute=express.Router();
const jwt=require("jsonwebtoken");
const middleware=require("../middleware.js");
const mongoose=require("mongoose");

patientRoute.post("/admin-login",async(req,res)=>
{
    try{
        const{email,password}=req.body;
        let exist=await adminSchema.findOne({email});
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
patientRoute.get("/admin-dashboard",middleware,async(req,res)=>{
    try{
        let exist =await adminSchema.findById(req.user.id);
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
module.exports=patientRoute;