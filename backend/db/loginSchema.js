const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:'This field is required'
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
      
    },
    address:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    data:[]


})

module.exports=mongoose.model('register',userSchema)