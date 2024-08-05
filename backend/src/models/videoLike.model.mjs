import mongoose from "mongoose";

const { Schema } = mongoose;

const VideoLikeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  type: { type: String, enum: ['like', 'dislike'], required: true },
}, { timestamps: true });

const VideoLike  = mongoose.model('VideoLike', VideoLikeSchema);

export default VideoLike