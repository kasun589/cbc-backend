
import express from "express";
import mongoose from"mongoose";
import studentRouter from "./routes/studentsRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";


const app = express();
app.use(express.json())

app.use(
    (req,res,next)=>{
       let token = req.header("Authorization")
      if(token != null){
        token = token.replace("Bearer ","")
        //console.log(token);
        jwt.verify(token,"jwt-secret", 
            (err, decoded)=>{
                if(decoded == null){
                    res.json({
                    massage:"Invalid Token Please Login Again"
                })
                return
            }else{
                req.user = decoded
            }
        }
    )
      }
      next()
    }
)
const connectionString = "mongodb+srv://admin:123@cluster0.k1vxdxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connection Succesfully");
    }
).catch(
    ()=>{
        console.log("Database connection failed");
    }
)
app.use("/students", studentRouter)
app.use("/users", userRouter)
app.use("/product", productRouter)

app.listen(5000, 
    ()=> {
    console.log("Server is running on port 5000 ");
   
}
)