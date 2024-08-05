import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.mjs";
import { LikeUser, VideoLikeUser } from "../controllers/like.controller.mjs";

const router = Router()

router.use(verifyJWT)

router.route('/:postId/:type').post(verifyJWT,LikeUser)
router.route('/videolikeurl/:videoId/:type').post(verifyJWT,VideoLikeUser)

export default router