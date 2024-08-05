import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.mjs";
import { upload } from "../middleware/multer.middleware.mjs";
import { CreateVideoController, getAllVideos, OneVideFetch } from "../controllers/video.controller.mjs";



const router = Router()



router.route('/upload').post(verifyJWT,
    upload.fields([
        {
            name :"video",
            maxCount :1,
        },
        {
            name : "thumbnail",
            maxCount :  1,
        }
        
    ]),
    CreateVideoController
)

router.route('/video').get(getAllVideos)
router.route('/singleplayer').get(OneVideFetch)
router.route('/singleplayer').get(OneVideFetch)

export default router