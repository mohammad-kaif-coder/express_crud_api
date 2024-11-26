//import mongo library to intract with mongoDB
import mongoose from "mongoose";
//define a schema (tempalte) for a "user" collection in mongoDb
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
       
    },
    email:{
        type: String,
        required:true,
        unique:true

    },
    jobTitle:{
        type: String
    },
    gender:{
        type:String
    }
},
{ timestamps:true }
);
//export the model so it can be used in other file
export default mongoose.model("users", userSchema);