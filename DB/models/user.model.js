import { model, Schema, Types } from "mongoose";

// users collection-->schema( userName , email , password hashed , age , gender , phone)
export const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email :{
        type:String,
        required:true,
    },
    password :{
        type:String,
        required:true,
    },
    age :String,
    gender:{
        type:String,
        enum:["male" , "female" ]
    },
    phone:Number
    // userId:{
    //     type:String,
    //     ref:Types.ObjectId.User
    // }
},{timestamps:true})

export const UserModel = model("UserModel",userSchema)