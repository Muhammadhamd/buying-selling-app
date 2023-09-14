import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"

const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"
import { type } from "os"

const db = client.db("userdatabase"),
      userCol = db.collection("users"),
      cartsCol = db.collection('carts')


   




const cartSchema = new mongoose.Schema({

   
    userId:{
        type:String,
        
    },
    timeStamp:{
        type: Date,
        default: Date.now
    },
   
    cartItems:[
        {
        productId:String,
        quantity:{
            require:true,
            type:Number
        }
    }
    ],
    
    
   
    
   
    // image:{
    //     type:String,
    //     required:true
    // } ,
        
})

const CartModel = mongoose.model("cart", cartSchema)


  
       
    

router.post("/addtocart", async(req,res)=>{

    // const currentUserEmail = res.locals.decodedData
    const {isdata}= req.body
    console.log(isdata)
    const cart =await cartsCol.findOne({userId:"1"})

    if (cart) {
        const cartItemArray = cart.cartItems

       const matchitems =  cartItemArray.findIndex((item)=> {
        return item.productId.toString() === isdata.productid
       })

      if (matchitems !== -1) {


        cartItemArray[matchitems].quantity = isdata.Quantity
        console.log(cartItemArray[matchitems].quantity)
         cartsCol.updateOne(
            {
                userId:"1",
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
            {userId:"1"},
            { $set:{cartItems:cart.cartItems}}
        )
        res.send("added to cart")
        return;
    }else{
        // const userData =await userCol.findOne({email:currentUserEmail})

   console.log(isdata)
   const dataTOarray= [isdata]

   
   const addtocart = await CartModel.create({
    // username: userData.username,
    userId: '1',
    // sellername:userData.name,
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
    const cart =await cartsCol.findOne({userId:"1"})

    if (cart) {
        const cartItems = await cart.cartItems
        res.send(cartItems)
    }

})
export default router