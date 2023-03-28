const express=require('express');
const fs=require('fs')
const router = express.Router();
const jwt=require('jsonwebtoken')
const jwtSecret="asd889asdas656asasksksfhd"
const loginModel=require('../db/loginSchema')

router.post('/addpost',(req,res)=>{
   
    console.log(req.body)
let name=req.body.name;
let email=req.body.email;
let phone=req.body.phone;
let address=req.body.address;
let pass=req.body.pass;
let data=[]

//insert data
let ins=new loginModel({name:name,email:email,phone:phone,address:address,pass:pass,data:[]});
ins.save((err)=>{
   if(err){ res.send("Already Added")}
  
})
})

router.post("/login",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    loginModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            let payload={
                uid:email
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
             res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})
module.exports=router;


//post
//http://localhost:8000/api/posts/addpost

//to get the data 

//http://localhost:8000/api/posts/fetchpost