
import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function createUser(req,res){
const hashedPassword =bcrypt.hashSync(req.body.password,10)

const user =new User(
   {
    email: req.body.email,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    password:hashedPassword
   }
)
user.save().then(
    ()=>{
        res.json(
            {
                massage:"user create succesfuly"
            }
        )
    }
).catch(
         ()=>{
                res.json(
                    {
                        massage:"user create failed"
                    }
                )
            }
        )

}

//export default userControler;
export function loginUser(req,res){
User.findOne(
    {
        email:req.body.email
    }
).then(
    (user)=>{
        if(user == null){
        res.status(404).json(
            {
                massage:"User Not Found"
            }
        )
    }else{
        const isPasswordMatching = bcrypt.compareSync(req.body.password,user.password)
        if(isPasswordMatching){
            const token =jwt.sign(
                {
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    role:user.role,
                    isEmailVerified:user.isEmailVerified,
                },
                "jwt-secret"
            )
            res.json(
                {
                    massage:"Login Succesfull",
                    token: token
                }
            )
        }else{
            res.json(
                {
                    massage:"Invalid Password"
                }
            )
        }
    }
    }
)

}

export function isAdmin (req){
    if(req.user == null){
        return false;
    }
    if (req.user.role != "admin"){
         return false;
    }
    return true;
}