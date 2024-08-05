import { FeatureUser } from "../models/follow.model.mjs";
import { User } from "../models/user.modle.mjs";
import  {asyncHandler} from '../utils/apiHelpers.mjs'

export const UserLike = asyncHandler(async(req,res)=>{
    const {like} = req.params
    const istrue = await FeatureUser.findOne({itemId : like})

    if(istrue){
       const isDelete = await FeatureUser.findOneAndDelete({itemId : like})
       return res.status(200).json({
        success: true,
        delete : isDelete,
        message : "is unlike"
       })

    }else{
        const newFeature = await FeatureUser.findOneAndUpdate(
            { itemId : like },  // Query to match the document
            {             // Update operation
              userId: req.user._id,
              id: like
            },
            {
              new: true,       // Return the modified document rather than the original
              upsert: true,    // Create the document if it doesn’t exist
              runValidators: true  // Ensure validators are run on the update
            }
          );
    
        await newFeature.save()

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { like_info: newFeature._id } },
            { new: true } // Returns the updated document
        )

        
    }

    return res.status(200).json({
        success:"true",
        message: "like Success"
    })
})


export const UserVideoLikes = asyncHandler(async(req,res)=>{
    try {
       const {videolikeId} = await req.params
      const isTrue = await FeatureUser.findOne({videoId : videolikeId})

      if(isTrue){
      const isDelete =  await FeatureUser.findByIdAndDelete({videoId : videolikeId})
      return res.status(200).json({
        success: true,
        delete : isDelete,
        message : "is unlike",
      })
      }else{
       const newVideoFeature = await FeatureUser.findByIdAndUpdate(
        {videoId : videolikeId},
        {
            videoUserId : req.user._id,
            videoId : videolikeId,
        },{new : true,upsert :true,runValidators:true}
       )

       await newVideoFeature.save()

      }
    } catch (error) {
        throw new Error(`UserVideoLikes Error : ${error}`)
    }
})