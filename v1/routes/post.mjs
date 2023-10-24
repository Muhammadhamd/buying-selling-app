import express from "express"
import mongoose from "mongoose"
import path from "path"
import { ObjectId ,  } from "mongodb"
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import app from '../../../firebaseconfig.mjs'
const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"
import jwt from 'jsonwebtoken'
const db = client.db("userdatabase"),
      userCol = db.collection("users"),
      postsCol = db.collection('posts')

      import multer from 'multer';
 
      // const Usermodel = mongoose.model('Users', userSchema);
      const upload = multer({
        storage: multer.memoryStorage(), // Store files in memory
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
        },
      });
      
   




const postSchema = new mongoose.Schema({

    username:{
        type:String,
    },
    sellername:{
        type:String,
    },
    userId:{
        type:String,

    },
    timeStamp:{
        type: Date,
        default: Date.now
    },
    description:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
        required:true
    } ,
    salesDiscount:{
        type:Number,
        
    } ,
    img:{
        type:String,
        required:true
    } ,
        
})

const postModel = mongoose.model("Post", postSchema)


  
       
    
const SECRET = process.env.SECRET || "topsecret";

function authenticateUser(req, res, next) {
  const token = req.cookies.AdminToken; // Assuming you store the token in a cookie
  if (token) {
    // Verify and decode the token here (use your actual logic)
    // For example, you can use the 'jsonwebtoken' library
    const decodedData = jwt.verify(token, SECRET);

    if (decodedData) {
        console.log("decoded",decodedData)
        req.body.admin = decodedData
        next()
    }else{
        res.status(401).send("token is not valid haha try again")
    }
  
  }
  res.status(401).send("login as admin")
  
}



router.post("/post", upload.single('image'), authenticateUser, async(req,res)=>{

    // const currentUserEmail = res.locals.decodedData 
    const token = req.cookies.AdminToken; 
    if (!token) {
        console.log(req.body)
        return res.status(401).send("login as admin ")
    }

    // const userData =await userCol.findOne({email:currentUserEmail})
   const {title , description  , price , tag ,salesDecsount }= req.body

try {
    console.log(title , description  , price , tag , salesDecsount)

    const addImgDB = req?.file
    let imgUrl = ''
 if (addImgDB) {
 const name = +new Date() + "-" + addImgDB.originalname;
 const metadata = {
  contentType: addImgDB.mimetype
 };
 const storageRef = ref(getStorage(app), name)
 
 const task = uploadBytes(storageRef, addImgDB.buffer, metadata);
 
 
 const snapshot = await task
 
 imgUrl =await getDownloadURL(snapshot.ref)
 console.log(imgUrl)
       
 }
       
 
 
    const post = await postModel.create({
    
     price: price,
     tag: tag,
     timeStamp: new Date(),
     title: title,
     description: description,
     salesDiscount:salesDecsount,
     img:imgUrl
 });
    res.send("posted")
} catch (error) {
    res.status(401).send(error)
}
})

router.get("/posts", async(req,res ,next)=>{
    const searched = req.query.s;
    

    const searchPostsData =  postsCol.find({})

   const postdata = await postsCol.find({}).sort({_id : -1}).limit(0).toArray()
    const posts = await searchPostsData.toArray()

    if(searched){
        const filteredPosts = posts.filter((post) => {
            // Check if 'post' is defined and has a 'title' property before calling 'toLowerCase'
            return post && post.title && post.title.toLowerCase().includes(searched.toLowerCase());
          });
          if(filteredPosts.length > 0){
            res.send(filteredPosts);
            return
        }
        else{
            res.status(404).send(`No post found with search=${searched}`)
            return

        }
        
        
    }
         res.send(postdata)

})


//////// -------- for women store page ----------///////


router.get("/posts/women", async(req,res ,next)=>{
    const searched = req.query.s;
    

    const searchPostsData =  postsCol.find({tag: 'women'})

   const postdata = await postsCol.find({tag: 'women'}).sort({_id : -1}).limit(0).toArray()
    const posts = await searchPostsData.toArray()

    if(searched){
        const filteredPosts = posts.filter((post) => {
            // Check if 'post' is defined and has a 'title' property before calling 'toLowerCase'
            return post && post.title && post.title.toLowerCase().includes(searched.toLowerCase());
          });
          if(filteredPosts.length > 0){
            res.send(filteredPosts);
            return
        }
        else{
            res.status(404).send(`No post found with search=${searched}`)
            return

        }
        
        
    }
         res.send(postdata)

})

//////// -------- for men store page ----------///////


router.get("/posts/men", async(req,res ,next)=>{
    const searched = req.query.s;
    

    const searchPostsData =  postsCol.find({tag: 'Men'})

   const postdata = await postsCol.find({tag: 'Men'}).sort({_id : -1}).limit(0).toArray()
    const posts = await searchPostsData.toArray()

    if(searched){
        const filteredPosts = posts.filter((post) => {
            // Check if 'post' is defined and has a 'title' property before calling 'toLowerCase'
            return post && post.title && post.title.toLowerCase().includes(searched.toLowerCase());
          });
          if(filteredPosts.length > 0){
            res.send(filteredPosts);
            return
        }
        else{
            res.status(404).send(`No post found with search=${searched}`)
            return

        }
        
        
    }
         res.send(postdata)

})


//////// -------- for children store page ----------///////


router.get("/posts/children", async(req,res ,next)=>{
    const searched = req.query.s;
    

    const searchPostsData =  postsCol.find({tag: 'children'})

   const postdata = await postsCol.find({tag: 'children'}).sort({_id : -1}).limit(0).toArray()
    const posts = await searchPostsData.toArray()

    if(searched){
        const filteredPosts = posts.filter((post) => {
            // Check if 'post' is defined and has a 'title' property before calling 'toLowerCase'
            return post && post.title && post.title.toLowerCase().includes(searched.toLowerCase());
          });
          if(filteredPosts.length > 0){
            res.send(filteredPosts);
            return
        }
        else{
            res.status(404).send(`No post found with search=${searched}`)
            return

        }
        
        
    }
         res.send(postdata)

})


router.get("/post/:postId",async (req,res)=>{
    const postId = req.params.postId
    console.log(postId)
    const post = await postsCol.findOne({ _id: new ObjectId(postId)})

    if (!post) {
        res.send("this post maybe deleted or disent exist")
        return;
    }
    res.send(post)


    
      
})
router.get("/store", async (req, res, next) => {
    try {
      const searched = req.query.s;
      const posts = await postsCol.find({}).toArray();
      if (!searched) {
        return
        res.status(403).send("no search querry")
      }
      const filteredPosts = posts.filter((post) => {
        // Check if 'post' is defined and has a 'title' property before calling 'toLowerCase'
        return post && post.title && post?.title?.toLowerCase().includes(searched.toLowerCase());
      });
      if(filteredPosts.length > 0){
        res.send(filteredPosts);
        return
    }else{
        res.status(404).send(`No post found with search=${searched}`)
        return
    }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
      return
    }
  });
  
router.get("postdata/:postId",async(req ,res)=>{

    const postId = req.params.postId

    const postdata = await postsCol.findOne({ _id: new ObjectId(postId)})
    res.send(postdata)
})
router.delete('/delete-product/:id',authenticateUser,async(req,res)=>{
    const id = req.params.id

    
    try {
       const done =  await postsCol.findOneAndDelete({_id : new ObjectId(id)})
       done ?  res.send("Product is deleted Sucessfully") : res.status(400).send("error in deleting Product")
       
    } catch (error) {
        res.status(400).send('database error try again')
    }

})
export default router