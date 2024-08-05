import mongoose from "mongoose";

const { Schema } = mongoose;

const LikeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  type: { type: String, enum: ['like', 'dislike'], required: true },
}, { timestamps: true });

const Like  = mongoose.model('Like', LikeSchema);

export default Like