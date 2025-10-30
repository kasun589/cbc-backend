import mongoose from "mongoose";

const productSchema = new mongoose.Schema(

{
    productID : {
        type:String,
        required:true,
        unique:true
    },
    name : {
        type:String,
        required:true
    },
    altNames : {
        type: [String],
        default : [],
        required:true
    },
    description : {
        type:String,
        required:true
    },
    images :{
        type: [String],
        default : [],
        required:true
    },
    price : {
        type: Number,
        required:true,
    },
    labledPrice : {
        type: Number,
        required:true,
    },
    category:{
        type: Number,
        required:true,
    },
}
)

const product = mongoose.model("Product", productSchema);
export default product;