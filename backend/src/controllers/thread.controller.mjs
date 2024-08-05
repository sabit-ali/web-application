import { Thread } from "../models/thread.model.mjs"
import { User } from "../models/user.modle.mjs"
import { asyncHandler } from '../utils/apiHelpers.mjs'
import { uploadOnCloudinary } from "../utils/cloudinary.mjs"


export const CreateThread = asyncHandler(async (req,res)=>{

   const user = await req.user._id

   if(!user){
    return res.status(400).json({
        success : false,
        message : "User not authantication"
    })
   }
    const {title, description} = await req.body

    const avatar = req.file

    if(!avatar){
        return res.status(400).json({
            success: false,
            message : "Avatar file is required"
        })
    }

    const avatarImg = await uploadOnCloudinary(avatar.path)

    if(!avatarImg){
        return res.status(400).json({
            success: false,
            message : "Avatar file is required"
        })
    }

   const newThread = await Thread.create({
        title,
        avatar : avatarImg?.url || '', 
        description,
        author : user,
    })

    await User.findByIdAndUpdate(
        user,
        { $push: { threads_info: newThread._id } },
        { new: true } // Returns the updated document
    )


    if(!newThread){
        return res.status(200).json({
            success :false,
            message : "thread Error not any values"
        })
    }

    await newThread.save()

    return res.status(200).json({
        success :true,
        message : "thread Success"
    })
})


export const getAllThreads = asyncHandler(async (req,res)=>{
    try {
        const { searchString, pageNumber = 1 , pageSize= 10, sortBy = 'desc'} = req.query

        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString,'i')

        const sortOptions = { createdAt: sortBy };

        const threadQuery = Thread.find({
            $or: [
                {title : { $regex: regex }},
                {description :{ $regex: regex }},
            ]
        })
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize)

     const totalVideoCount = await Thread.countDocuments(searchString)

    const threads = await threadQuery.exec()

   const isNext =  totalVideoCount > skipAmount + threads.length

   return  res.status(200).json({
    success : true,
    data:threads,
    isNext,
   })
    } catch (error) {
        console.log("error")
        throw new Error(error)
    }
})


export const getOneThred = asyncHandler(async (req,res)=>{
    const {threadId} = req.query

    try {
       const oneThread = await Thread.findById(threadId)
       if(!oneThread){
        return res.status(400).json({
            success:false,
            message : "thread not found"
        })
       }

       return res.status(200).json({
        success:true,
        data : oneThread,
        message : "success to fetch thread"
       })
    } catch (error) {
        return res.status(500).json({
            success:false,
           
            message : `something went wrong : ${error} `
        })
    }
})


