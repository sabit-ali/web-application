import mongoose from 'mongoose'

const featureUser = new mongoose.Schema({
    userId : [
        {
            type : mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    itemId :[ {
        type :String,
    }],
    videoId :[ {
        type :String,
    }],
    videoUserId : [
        {
            type : mongoose.Types.ObjectId,
            ref:"User"
        }
    ],

})

export const FeatureUser = mongoose.model("FeatureUser",featureUser)