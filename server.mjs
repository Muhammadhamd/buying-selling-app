import express from "express"
import path from "path"
// import cors from "cors"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
const app = express()
const __dirname = path.resolve()
const mongodbURI =  process.env.mongodbURI || "mongodb+srv://muhammadhamdali572:hamdali99332@cluster0.g7j5dka.mongodb.net/userdatabase?retryWrites=true&w=majority";
import cors from "cors"
const SECRET = process.env.SECRET || "topsecret";
import authrouter from "./v1/routes/auth.mjs"
import apiv1 from "./v1/index.mjs"
import userinfoRoutes from './v1/routes/userinfo.mjs'
import cartRoutes from "./v1/routes/cart.mjs"
import ratingroutes from './v1/routes/rating.mjs'
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', "*"],
    credentials: true
}));


app.use(apiv1)



app.use((req, res, next) => {

    console.log("req.cookies: ", req.cookies.Token);

    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }

    jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
        if (!err) {

            console.log("decodedData: ", decodedData);

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {

                res.status(401);
                res.cookie('Token', '', {
                    maxAge: 1,
                    httpOnly: true
                });
                res.send({ message: "token expired" })

            } else {

                console.log("token approved");

                req.body.decodedData = decodedData
                console.log(decodedData)
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})
app.use(cartRoutes)
app.use(ratingroutes)
app.use(userinfoRoutes)

app.use(express.static(path.join(__dirname, 'client/build')))
app.get(express.static(path.join(__dirname, 'client/build')))
app.use("*", express.static(path.join(__dirname, 'client/build')))

const PORT = process.env.PORT || 2344
app.listen(PORT,()=>{
    console.log(PORT)
})
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});