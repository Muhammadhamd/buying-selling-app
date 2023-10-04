import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const __dirname = path.resolve();
const SECRET = process.env.SECRET || 'topsecret';

// Define the user schema and model
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Usermodel = mongoose.model('Users', userSchema);

// User registration route
router.post('/userregister', async (req, res) => {
  const { password, email, name } = req.body;
 console.log(req.body)
  if (!password || !email || !name) {
    return res.status(400).send('Required fields are missing.');
  }

  try {
    const user = await Usermodel.findOne({ email });

    if (user) {
      return res.status(400).send('User already exists. Please use a different email.');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await Usermodel.create({
        name,
        email,
        password: hashedPassword,
      });
   console.log("fgaegf",data)
      // const token = jwt.sign({
      //   _id: data._id,
      //   email: data.email,
      //   iat: Date.now() / 1000 - 30,
      //   exp: Date.now() / 1000 + (60 * 60 * 24),
      // }, SECRET);

      // res.cookie('Token', token, {
      //   maxAge: 86_400_000,
      //   httpOnly: true,
      // });

      res.redirect('/shop');
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
    const data = await Usermodel.findOne({ email });

    if (!data) {
      return res.status(401).send('Incorrect email or password.');
    }

    const isMatch = await bcrypt.compare(password, data.password);

    if (isMatch) {
      const token = jwt.sign({
        _id: data._id,
        email: data.email,
        iat: Date.now() / 1000 - 30,
        exp: Date.now() / 1000 + (60 * 60 * 24),
      }, SECRET);

      res.cookie('Token', token, {
        maxAge: 86_400_000,
        httpOnly: true,
      });

      res.redirect('/');
    } else {
      return res.status(401).send('Incorrect password.');
    }
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).send('Login failed, please try later.');
  }
});

// User logout route
router.post('/logout', (req, res) => {
  res.cookie('Token', '', {
    maxAge: 1,
    httpOnly: true,
  });
  res.redirect('/registration');
  res.send({ message: 'Logout successful' });
});

export default router;
