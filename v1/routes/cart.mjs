import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"

const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"
import { type } from "os"
import { match } from "assert"

const db = client.db("userdatabase"),
      productcol = db.collection("posts"),
      cartsCol = db.collection('carts')


   



   
    
   




  
       
    

router.post("/addtocart", async(req,res)=>{

    // const currentUserEmail = res.locals.decodedData
    const {isdata}= req.body
    console.log(isdata)
    const cart =await cartsCol.findOne({userId : req.body.decodedData._id})

    if (cart) {
        const cartItemArray = cart.cartItems

       const matchitems =  cartItemArray.findIndex((item)=> {
        return item.productId === isdata.productid
       })

      if (matchitems > -1) {
console.log(matchitems)

        cartItemArray[matchitems].quantity = isdata.Quantity
        // console.log(cartItemArray[matchitems].quantity)
         cartsCol.updateOne(
            {
                userId:req.body.decodedData._id,
            }
            ,{
                $set:{
                    cartItems: cartItemArray,
                }
            }
        )
       
    res.send("updated")
    console.log(cartItemArray[matchitems])
        return
      }
        const newcartItem = {
            productId:isdata.productid,
            quantity:isdata.Quantity
        }
        
        console.log("fa",cartItemArray)
        cart.cartItems.push(newcartItem)

        cartsCol.updateOne(
            {userId:req.body.decodedData._id},
            { $set:{cartItems:cart.cartItems}}
        )
        res.send("added to cart")
        return;
    }else{
        // const userData =await userCol.findOne({email:currentUserEmail})

   console.log(isdata)
   const dataTOarray= [isdata]

   
   const addtocart = await cartsCol.insertOne({
  
    userId:req.body.decodedData._id,
    cartItems:[
        {
            productId:isdata.productid,
            quantity:isdata.Quantity
        }
    ]
});
   res.send(addtocart)
    }
})


router.get("/getcartdata",async(req,res)=>{
    const cart =await cartsCol.findOne({userId:req.body.decodedData._id})

    if (!cart) {
      res.send("Cart is Empty")
      return
    
    }

        const cartItems = await cart.cartItems
        console.log(cartItems)
        const productid = cartItems?.map((item) => new ObjectId(item.productId));
        console.log(productid)
        const posts = await productcol.find({ _id: { $in: productid } }).toArray()
        // res.send(posts)
        
        const cartData = cartItems.map((cartItem) => {
            const product = posts.find((p) => p._id.equals(cartItem.productId));
            return {
              ...product,
              quantity: cartItem.quantity,
            };
          });
        res.json(cartData)
})
export default router   
            