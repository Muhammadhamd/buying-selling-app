import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"

const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"

const db = client.db("userdatabase"),
      userCol = db.collection("users"),
      postsCol = db.collection('posts')


   



  
       
    

router.post("/post-rating/:productId", async(req,res)=>{

    const currentUserId = req.body.decodedData._id
    const currentUserImage = req.body.decodedData?.image
    const currentUserName = req.body.decodedData.name
  const productId = req.params.productId

    // const userData =await userCol.findOne({email:currentUserEmail})
   const {rating , message}= req.body

   const product = await postsCol.findOne({_id: new ObjectId(productId)})

   const matchRating = product.rating?.findIndex((eachrate)=> eachrate.currentUserId === currentUserId)
   console.log(matchRating)
   if(matchRating  > -1){

    res.send("olready rated")
    return
   }
   await postsCol.updateOne(
    { _id: new ObjectId(productId) },
    { $push: { 'rating': {rating, message ,currentUserName , currentUserId ,
    timestamp:Date.now(),
    userprofileImage:currentUserImage
    } ,
    
    } 
}
  );
    
     
   res.send("rated")
})



  


export default router