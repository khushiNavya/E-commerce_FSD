import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from"jsonwebtoken"
import "dotenv/config"

const {Schema,model}=mongoose;

const addressSchema=new Schema({
    state:String,
    pincode:Number,
    city:String,
})

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"user's name not found"],
        min:[3,"min length is 3"],
        max:[25,"max length is 25"]
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    address:{
        type:[addressSchema],
        default:[]
    },
   
}, {timestamps:true},)

userSchema.pre("save",async function (){
    let user=this;
    if(!user.isModified("password")) return;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(user.password,salt);
    user.password=hashedPassword;
})

userSchema.methods.comparePassword=async function(candidatePassword){
    const result=await bcrypt.compare(candidatePassword,this.password)
    return result;
}

userSchema.methods.generateToken=async function(){
    const user=this;
    const {_id,email}=user;
    const token=await jwt.sign({
        data:{_id,email},
       
    },process.env.SECRET_KEY)
    return token;
}

const User=model("Users",userSchema)

export default User;