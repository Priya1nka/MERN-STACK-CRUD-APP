const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
            type:String,
            required:true
        }
,
    dob:{
        type:String,
        required:true
    },
    mobno:{
        type:Number,
        required:true
    }
})

const users=new mongoose.model("users",userSchema)

module.exports=users;