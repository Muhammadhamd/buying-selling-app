import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import {client} from "../../mongodb.mjs"
import app from '../../firebaseconfig.mjs'
const router = express.Router();
const __dirname = path.resolve();
const SECRET = process.env.SECRET || 'topsecret';
const db = client.db('userdatabase')
const col = db.collection("User")
// Define the user schema and model
import multer from 'multer';
 
// const Usermodel = mongoose.model('Users', userSchema);
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
  },
});

// User registration route
router.post('/userregister',upload.single('ProfileImage'), async (req, res) => {
  const { password, email, name } = req.body;
 console.log(req.body)
  if (!password || !email || !name) {
    return res.status(400).send('Required fields are missing.');
  }

  try {


       const addImgDB = req?.file
       console.log(addImgDB.mimetype)
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
          

    const user = await col.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists. Please use a different email.');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await col.insertOne({
        name,
        email,
        password: hashedPassword,
        profileImage:imgUrl
      });
   console.log("fgaegf",data)
      const token = jwt.sign({
        _id: data._id,
        email: data.email,
        name:data.name,
        image:data.profileImage,
        iat: Date.now() / 1000 - 30,
        exp: Date.now() / 1000 + (60 * 60 * 24),
      }, SECRET);

      res.cookie('Token', token, {
        maxAge: 86_400_000,
        httpOnly: true,
      });

      res.send("login sucessfully")
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

// User login route
router.post('/userlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await col.findOne({ email });

    if (!data) {
      return res.status(401).send('Incorrect email or password.');
    }
    console.log(data)

    const isMatch = await bcrypt.compare(password, data.password);

    if (isMatch) {
      const token = jwt.sign({
        _id: data._id,
        email: data.email,
        name:data.name,
        image:data.profileImage,
        iat: Date.now() / 1000 - 30,
        exp: Date.now() / 1000 + (60 * 60 * 24),
      }, SECRET);

      res.cookie('Token', token, {
        maxAge: 86_400_000,
        httpOnly: true,
      });

      res.send("login sucessfully")

    } else {
      return res.status(401).send('Incorrect password.');
    }
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).send('Login failed, please try later.');
  }
});

// User logout route
router.get('/logout', (req, res) => {
  res.cookie('Token', '', {
    maxAge: 1,
    httpOnly: true,
  });
  res.send({ message: 'Logout successful' });
});

export default router;
