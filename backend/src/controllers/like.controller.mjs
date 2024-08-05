import { Thread } from "../models/thread.model.mjs";
import Like from "../models/like.model.mjs";
import { asyncHandler } from "../utils/apiHelpers.mjs";
import { io } from "../../index.mjs";
import { Video } from "../models/video.model.mjs";
import VideoLike from "../models/videoLike.model.mjs";

export const LikeUser = asyncHandler(async (req, res) => {
    const { postId, type } = req.params;
    const userId = req.user._id;

    // Validate `type`
    if (!['like', 'dislike'].includes(type)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid like/dislike type'
        });
    }

    // Find the thread and existing like/dislike in a single query
    const thread = await Thread.findById(postId);
    if (!thread) {
        return res.status(404).json({
            success: false,
            message: 'Thread not found'
        });
    }

    // Find existing like/dislike
    const existingLike = await Like.findOne({ userId, postId, type });
    if (existingLike) {
        return res.status(200).json({
            success: true,
            message: 'Already liked/disliked',
            value: 0
        });
    }

    // Check for opposite type action and remove it if exists
    const oppositeType = type === 'like' ? 'dislike' : 'like';
    const existingOppositeLike = await Like.findOne({ userId, postId, type: oppositeType });

    if (existingOppositeLike) {
        await Like.deleteOne({ _id: existingOppositeLike._id });

        if (oppositeType === 'like') {
            thread.likes.pull(userId);
        } else {
            thread.dislikes.pull(userId);
        }
    }

    // Create a new like/dislike record
    const newLike = new Like({ userId, postId, type });
    await newLike.save();

    if (type === 'like') {
        thread.likes.push(userId);
    } else {
        thread.dislikes.push(userId);
    }

    await thread.save();

    // Emit the update to all clients
    io.emit('updatePost', thread);

    return res.status(200).json({
        success: true,
        userId: req.user._id,
        message: 'Like/dislike success',
        value: 1
    });
});



export const VideoLikeUser = asyncHandler(async (req, res) => {
    try {
        const { videoId, type } = req.params;
        const userId = req.user._id;

        // Validate `type`
        if (!['like', 'dislike'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid like/dislike type'
            });
        }

        // Find the video
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        // Check for existing like/dislike
        const existingLike = await VideoLike.findOne({ userId, videoId, type });
        if (existingLike) {
            return res.status(200).json({
                success: true,
                message: 'Already liked/disliked',
                value: 0
            });
        }

        // Check for opposite type action and remove it if exists
        const oppositeType = type === 'like' ? 'dislike' : 'like';
        const existingOppositeLike = await VideoLike.findOne({ userId, videoId, type: oppositeType });

        if (existingOppositeLike) {
            await VideoLike.deleteOne({ _id: existingOppositeLike._id });

            if (oppositeType === 'like') {
                video.likes.pull(userId);
            } else {
                video.dislikes.pull(userId);
            }
        }

        // Create a new like/dislike record
        const newLike = new VideoLike({ userId, videoId, type });
        await newLike.save();

        // Update video with the new like/dislike
        if (type === 'like') {
            video.likes.push(userId);
        } else {
            video.dislikes.push(userId);
        }

        await video.save();

        // Emit the update to all clients
        if (io) {
            io.emit('updatePost', video);
        }

        return res.status(200).json({
            success: true,
            userId: req.user._id,
            message: 'Like/dislike success',
            value: 1
        });

    } catch (error) {
        console.log(`VideoLikeUser error: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});
