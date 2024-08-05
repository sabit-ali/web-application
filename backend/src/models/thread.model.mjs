import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


 const ThreadSchema = new mongoose.Schema({
    title : {
        type:String,
        required : true,
        trim : true,
        index : true,
        unique : true,
    },
    avatar:{
        type : String,
        required : true,
    },
    description : {
        type:String,
        required : true,
        trim : true,
    },
    author :[
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],

},{timestamps:true})

ThreadSchema.plugin(mongooseAggregatePaginate)

export const Thread = mongoose.model("Thread",ThreadSchema)