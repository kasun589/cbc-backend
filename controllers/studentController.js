
import Student from "../models/students.js";

export function getStudents(req,res) {
Student.find()
.then((data)=>{
        res.json(data);
        console.log("Get request reserved");
    }
).catch(
    ()=>{
    }
);
}
export function createStudents(req,res){

if(req.user == null){
    res.json({
        massage:"Please login and try again"
    })
    return
}
if(req.user.role != "admin"){
    res.json({
        massage:"You must be an admin to create a student"
    })
    return
}

        const student =new Student({
            name:req.body.name,
            age:req.body.age,
            gender:req.body.gender,
            city:req.body.city
        })
        student.save().then(
            ()=>{
                res.json(
                    {
                        massage:"student create succsufuly"
                    }
                )
            }
        ).catch(
            ()=>{
                res.json(
                    {
                        massage:"student create failed"
                    }
                )
            }
        )
    }


