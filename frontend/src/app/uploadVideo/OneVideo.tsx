
import { Button } from '@/components/ui/button'
import Accesstoken from '@/utils/AccessToken'
import Socket from '@/utils/Socket'
import axios from 'axios'
import { Heart, HeartOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


interface Post {
    _id: string;
    title: string;
    videoFile : string,
    description: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    likes: Array<string>; // Array of user IDs
    dislikes: Array<string>; // Array of user IDs
}

export default function OneVideo() {
    const auth = useSelector((state: any) => state.user);
    const accessToken = Accesstoken()
    const [post, setPost] = useState<Post | null>(null);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    const socket = Socket()

    const params = useParams<{ videoId: string }>()

    useEffect(() => {
        (async () => {
            await axios.get(`/api/v1/videos/singleplayer?videoId=${params.videoId}`)
                .then((data) => {
                    const fetchData = data.data.data
                    console.log("data",fetchData)
                    setPost(fetchData)
                    setHasLiked(fetchData.likes.includes(auth?._id))
                })

        })()
    }, [])

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected", socket.id);
        });

        socket.on('updatePost', (updatedPost) => {
            if (updatedPost._id === params.videoId) {
                setPost(updatedPost);
                setHasLiked(updatedPost.likes.includes(auth?._id));
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, params.videoId]);

    console.log("auth", auth)
    console.log("haslike", hasLiked)
    const handleClickLike = async () => {
        if (params.videoId) {
            try {
                const action = hasLiked ? 'unlike' : 'like';
                await axios.post(`/api/v2/feature/videolikeurl/${params.videoId}/${action}`, null, { // Second argument is data, which is null in this case
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Set the Authorization header
                    },
                    withCredentials: true, // Include credentials if needed
                });
                setHasLiked(!hasLiked);
            } catch (error) {
                console.error('Error liking the thread', error);
            }
        }
    };

    const handleClickDisLike = async () => {
        if (params.videoId) {
            try {
                await axios.post(`/api/v2/feature/videolikeurl/${params.videoId}/dislike`, null, {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Set the Authorization header
                    },
                    withCredentials: true, // Include credentials if needed
                });
            } catch (error) {
                console.error('Error disliking the thread', error);
            }
        }
    };


    return (
        <div className='min-h-screen h-screen flex justify-center '>
            <div className='md:flex'>
                <div className=' max-w-md mx-auto mt-2'>
                <video src={post?.videoFile}
                     width="320" height="240" controls />
                    {/* <img className=' h-80 md:h-full w-full object-cover' src={post?.thumbnail} alt="post" /> */}
                </div>
                <div className='w-full flex flex-col mx-auto py-3'>

  
                                
                            <div className='flex flex-col justify-center items-center gap-4 w-full'>
                                <h1 className='font-serif font-semibold text-2xl text-center '>{post?.title}</h1>
                                <p className='font-sans text-neutral-500 text-center text-sm'>{post?.description}</p>
                                <div className="flex items-center gap-5 justify-between py-1">
                                    <Button onClick={handleClickLike} className={`flex items-center gap-2 ${hasLiked ? 'text-red-500' : ''}`}>

                                        {hasLiked ? <Heart className={`${hasLiked ? 'text-red-500' : ''}`} /> : <HeartOff />}
                                        {post?.likes.length}
                                    </Button>
                                    <Button onClick={handleClickDisLike} className="flex items-center gap-2">
                                        Dislike ({post?.dislikes.length})
                                    </Button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            )
}
