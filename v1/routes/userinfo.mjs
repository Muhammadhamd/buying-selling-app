import express from 'express'
import jwt from "jsonwebtoken"
import  mongoose  from 'mongoose'
const router = express.Router()
import {client} from "./../../mongodb.mjs"

const db = client.db("userdatabase"),
      col = db.collection("users")

// router.get("/currentuser", async(req,res)=>{

//     const currentUserEmail = res.locals.decodedData


//     const userData =await col.findOne({email:currentUserEmail})

//     res.send(userData)
//     console.log("ytfrujyhy",userData)

//     // res.status()

   

// })


router.get(`/users`, async(req,res,next)=>{

    let  accountid = req.params.userAPIs
 
     const accountsData =  col.find({})
 
     const accounts = await accountsData.toArray()
 
         res.send(accounts)
 
         // iDURL(accounts.id)
         
     
 
 })


export default router