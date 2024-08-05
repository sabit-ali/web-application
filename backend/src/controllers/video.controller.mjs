
import { User } from "../models/user.modle.mjs";
import { Video } from "../models/video.model.mjs";
import { ApiError, ApiResponse, asyncHandler } from "../utils/apiHelpers.mjs";
import { uploadOnCloudinary } from "../utils/cloudinary.mjs";

export const CreateVideoController = asyncHandler(async (req,res)=>{
    try {
        const {title,description} = await req.body
        const thisVieo = req.files?.video[0].path;
        const thumbnailImg = req.files?.thumbnail[0].path
        const user = await req.user._id
     
        const video =  await uploadOnCloudinary(thisVieo)
        const thumbnail = await uploadOnCloudinary(thumbnailImg)
    
       if(!video){
         return res.status(400).json(
             new ApiResponse(400,{},'vide file missing')
         )
       }
     
       if(!thumbnail){
             return res.status(400).json(
             new ApiResponse(400,{},'thumbnail.. is missing')
             )
         }

        //  const user = User.findById(req.user,_id).select('-username -password -refreshToken -name -email ')
         console.log("video",video)
         
        const newVideo =  await Video({
            title,
            description  : description.toLowerCase(),
            videoFile : video?.url,
            thumbnail : thumbnail?.url,
            duration : video.duration ,
         })

         await newVideo.save()
        console.log("succ :", newVideo)
        await User.findByIdAndUpdate(
            user,
            {
              $push : {video_info : newVideo._id}
            },{new : true}
        )

       
         return res.status(200).json(
             new ApiResponse(201,"upload successfully ")
         )
    } catch (error) {
        return res.status(500).json(
            new ApiError(500,"Not Uploding video",error)
        )
    }

})

export const getAllVideos = asyncHandler(async (req,res)=>{
    const { searchString, pageNumber = 1 , pageSize= 10, sortBy = 'desc'} = req.query
    try {

        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString,'i')

        const sortOptions = { createdAt: sortBy };

        const threadQuery = Video.find({
            $or: [
                {title : { $regex: regex }},
                {description :{ $regex: regex }},
            ]
        })
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize)

     const totalVideoCount = await Video.countDocuments(searchString)

    const videos = await threadQuery.exec()

   const isNext =  totalVideoCount > skipAmount + videos.length

   return  res.status(200).json({
    success : true,
    data:videos,
    isNext,
   })
    } catch (error) {
        console.log("error")
        throw new Error(error)
    }
})


export const OneVideFetch = asyncHandler(async (req, res)=>{
    const {videoId,postId} =  req.query

    console.log("postId",postId)
    const video = await Video.findById(videoId)

    if(!video) return res.status(400).json({
        success:false,
        message : "video not found!"
    })

    return res.status(200).json({
        success :true,
        data : video,
        message : "sucesss"
    })
})
