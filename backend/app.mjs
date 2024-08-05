import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({extended : true, parameterLimit : 100000, limit : '500mb'}))
app.use(express.urlencoded({extended : true, parameterLimit : 100000, limit : '500mb'}))
app.use(express.static("dist"))
app.use(cookieParser())


//routers define

import userRouter from './src/routes/user.route.mjs'
import videoRouter from './src/routes/video.route.mjs'
import Thread from './src/routes/thread.route.mjs'
import FeatureUser from './src/routes/featureUser.mjs'
//api define

app.use('/api/v1/users',userRouter)
app.use('/api/v1/videos',videoRouter)
app.use('/api/v1/thread',Thread)
app.use('/api/v2/feature',FeatureUser)


export {app}