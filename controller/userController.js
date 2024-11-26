//import the user model
import User from "../models/userModel.js";

export const create = async (req, res) => {
    try{
        console.log("Request body:", req.body);
        //validate required field
        const {firstName, lastName, email } = req.body;
        if(!firstName || !lastName || !email){
            return res.status(400).json({message:"Missing required field"});
        }
        //check if user exists
        const userExist = await User.findOne({ email });
        if(userExist){
            return res.status(400).json({message:"User already exists."});
        }
        //save new user
        const userData = new User(req.body);
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message:"Duplicate field value entered."});

        }
         return res.status(500).json({error:"Internal Server error."})//log error for debugging  
    }
}

export const fetch = async(req, res)=>{
    try{
       return res.json("Hello world.")
    }catch(error){
        res.status(500).json({error:"Internal Server error"});

    }
};

//fetch all record 
export const fetchAll = async(req, res)=>{
    try{
        const users = await User.find();
        if(users.length === 0){
            return res.stats(404).json({message:"User not found"});
        }
        return res.json(users);

    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

//udate user 


export const update = async (req, res) => {
    try {
        const id = req.params.id; // Access `id` directly from `req.params`

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        // Find the user by ID
        const userExit = await User.findById(id); // `findById` accepts only the ID
        console.log("User found:", userExit);

        if (!userExit) {
            return res.status(404).json({ message: "User does not exist." });
        }

        // Update user data
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updateUser);

    } catch (error) {
        console.error("Error in update operation:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const fetchUserById = async (req, res) => {
    try {
        // Extract the id from route parameters
        const { id } = req.params;
        console.log('User ID:', id);

        // Find user by ID
        const userdata = await User.findById(id);

        // If user not found, respond with 404
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user data
        res.status(200).json(userdata);
    } catch (error) {
        console.error("Error in fetchUserById:", error); // Log the error
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//delete user
export const userdelete =  async (req, res) => {
    try{
        const {id} = req.params;
        console.log('user id:-', id);
        const userDelete = await User.findByIdAndDelete(id);
        return res.status(200).json({message:"user successfully delete"});


    }catch(error){
        return res.status(500).json({message:"Internal server error"});

    }
};


