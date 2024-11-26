// import necessary libraries
import express from "express";//Framwork for bulding web server
import mongoose from "mongoose";//library to connect and intract with MongoDb
import bodyParser from "body-parser";//Middleware to parse JSON data in requests
import dotenv from "dotenv";//Library to manage environment variablea
import route from "./routes/userRoute.js";//import the routers

//create an express application
const app = express();
//use body-parser to handel json data incomming request
app.use(bodyParser.json());
//Load environment variables form a env.file
dotenv.config();
//get the port number and mongoDb url from the environment file
const PORT = process.env.PORT || 5000;//use the port form .env or default to 5000
const MONGOURL = process.env.MONGO_URL;//Mongo Db connection string

//connect to mongodb using Mongoose
mongoose.connect(MONGOURL).then(()=>{
    //if connection successfully
    console.log('Database connected successfully');
    //start the express server
    app.listen(PORT,()=>{
        console.log(`server is running on port http://localhost:${PORT}`);
    })
   //if connection fails,log the error
}).catch((error)=>console.log(error));


//  
app.use("/api/user", route)