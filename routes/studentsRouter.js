import express from "express";
import { getStudents,createStudents} from "../controllers/studentController.js";
const studentRouter = express.Router();

studentRouter.get("/", getStudents);

studentRouter.post("/", createStudents);

studentRouter.put("/", ()=>
{
    console.log("put request reserve");
}
)                                   
studentRouter.delete("/", ()=>
{                                           
    console.log("delete request reseved");
}
)

export default studentRouter;
