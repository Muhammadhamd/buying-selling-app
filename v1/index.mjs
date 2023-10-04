import express from "express"
import authRouter from "./routes/auth.mjs"
import userdata from "./routes/userinfo.mjs"
import profileRouter from "./routes/profile.mjs"
import postRouter from "./routes/post.mjs"
import cartRouter from "./routes/cart.mjs"
const router = express.Router()


router.use(cartRouter)
router.use(authRouter)
router.use(userdata)
router.use(profileRouter)
router.use(postRouter)
// router.use(profileRouter)

export default router