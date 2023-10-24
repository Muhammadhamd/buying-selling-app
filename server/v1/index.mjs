import express from "express"
import postRouter from "./routes/post.mjs"
import authRouter from "./routes/auth.mjs"
import profileRouter from "./routes/profile.mjs"

const router = express.Router()

router.use(postRouter)
router.use(profileRouter)
router.use(authRouter)
export default router