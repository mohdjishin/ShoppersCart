var db = require("../config/connection")
var collection = require("../config/collections")
var ObjectId= require("mongodb").ObjectId;
const { response } = require("express");

module.exports = {

    addProduct: (product, callback) => {
        console.log(product);

        db.get().collection("product").insertOne(product).then((data) => {
            console.log(data)
            callback(data.insertedId)
        })
    },

    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {

            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(prodId)=>{

        return new Promise((resolve,reject)=>{
            
            console.log(prodId);
            console.log(ObjectId(prodId));
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:ObjectId(prodId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
     
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct: (proId,ProductDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:ObjectId(proId)},{
                $set:{
                    Name:ProductDetails.Name,
                    description:ProductDetails.description,
                    Category:ProductDetails.Category,
                    Price:ProductDetails.Price


                }
            }).then((response)=>{
                resolve()
            })
        })
    }

    




}