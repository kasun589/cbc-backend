import { response } from "express";
import Product from "../models/product.js";
import { isAdmin } from "./userControler.js";

export async function createProduct(req,res){

if(!isAdmin (req)){
    res.status(403).json(
        {
            massage : "you are not authorized to create product"
        }
    );
    return;
}

try{


    const productData = req.body;
    const product = new Product(productData);
    await product.save();

    res.json(
        {
            massage : "product successfully saved",
            product : product,
        }
    );
    }catch(err){
        console.error(err);
        res.status(500).json(
            {
                massage : "failed to create product",
            }
        );
    }
}

export async function getProduct(req,res){
    try{
        const product = await Product.find()
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json(
            {
                massage : "failed to retrive produt",
            }
        );
    }
}

export async function deleteProduct(req,res){
if(!isAdmin (req)){
    res.status(403).json(
        {
            massage : "you are not authorized to create product"
        }
    );
    return;
}
    try{
        const productID = req.params.productID
        
        await Product.deleteOne(
            {productID : productID},
        );

        res.json({
            massage : "Product Delete Succesfuly"
        })

    }catch(err){
        console.error(err);
        res.status(500).json(
            {
                massage : "failed to delete product",
            }
        )
    }
}

export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "you are not authorized to update product"
        });
        return;
    }

    try {
        const productID = req.params.productID;
        const updateData = req.body;

        await Product.updateOne(
            { productID: productID },
            updateData
        );

        res.json({
            message: "Product Updated Successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "failed to update product",
        });
    }
}

export async function getProductId(req,res){
    try{
        const productID = req.params.productID;
        const product = await Product.findOne(
            {
                productID : productID
            }
        )
        if(product == null){
            res.status(404).json(
                {
                    massage:"Product Not Found"
                }
            );
        }else {
            res.json(product);
        }
    }catch (err){
        console.error(err);
        res.status(500).json(
            {
                massage:"Failed To retrived product by iD",
            }
        );
    }
}