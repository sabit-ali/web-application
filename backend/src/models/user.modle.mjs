import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const userSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    username :{
        type : String,
        required:true,
        unique : true,
        trim : true,
        index: true,
    } ,
    email :{
        type:String,
        required:[true,'email is required!'],
        trim:true,
    },
    avatar:{
        type : String,
    },
    watchHistory :[
        {
            type : mongoose.Types.ObjectId,
            ref:'Video'
        }
    ],
    threads_info :[
        {
            type : mongoose.Types.ObjectId,
            ref:'Thread'
        }
    ],
    video_info : [
        {
            type : mongoose.Types.ObjectId,
            ref:"Video"
        }
    ],
    follow : {
        type : mongoose.Types.ObjectId,
        ref:"FeatureUser"
    },
    like_info : [{
        type :mongoose.Types.ObjectId,
        ref:"FeatureUser"
    }],
    password : {
        type : String,
        required : [true, 'password is required!']
    },
    refreshToken :{
        type:String
    },
    isVerified :{
        type:Boolean,
        default : false
    },
    verifyCode :{
        type:String
    },
    verifyCodeExpiry:{
        type : Date,
        default : new Date(),
        required : true
    },

},{timestamps:true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isCurrectPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            avatar :this.avatar,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User',userSchema)