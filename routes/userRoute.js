import express from "express";
import { fetch ,create, fetchAll, fetchUserById, update, userdelete} from "../controller/userController.js";

const route = express.Router();

route.post("/create",create);
//fetch all data 
route.get("/fetchall",fetchAll);
//fetch user by id 
route.get("/getfetchuser/:id",fetchUserById)
route.put("/update/:id", update)
route.delete("/deleteuser/:id", userdelete)

route.get("/fetch",fetch);

export default route;