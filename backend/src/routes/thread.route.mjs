import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.mjs";
import { CreateThread, getAllThreads, getOneThred } from "../controllers/thread.controller.mjs";
import  { upload} from  '../middleware/multer.middleware.mjs'

const router = Router()



router.route('/upload-thread').post(verifyJWT, 
    upload.single("avatar")
    ,CreateThread)
router.route('/getthreads').get(getAllThreads)
router.route('/get-one-thread').get(getOneThred)

export default router