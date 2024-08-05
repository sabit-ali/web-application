import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Heart, HeartOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Accesstoken from '@/utils/AccessToken';
import Socket from '@/utils/Socket';


interface Post {
    _id: string;
    title: string;
    description: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    likes: Array<string>; // Array of user IDs
    dislikes: Array<string>; // Array of user IDs
}

export default function OnePage() {
    const auth = useSelector((state: any) => state.user);
    const params = useParams<{ threadId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [hasLiked, setHasLiked] = useState<boolean>(false);
    const accessToken = Accesstoken()

    const socket = Socket()

    useEffect(() => {
        const fetchOnePage = async () => {
            try {
                const response = await axios.get(`/api/v1/thread/get-one-thread?threadId=${params.threadId}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Set the Authorization header
                      },
                      withCredentials: true, // Include credentials if needed
                });
                const fetchedPost = response.data.data;
                setPost(fetchedPost);
                setHasLiked(fetchedPost.likes.includes(auth?._id));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOnePage();
    }, [params.threadId]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected", socket.id);
        });

        socket.on('updatePost', (updatedPost) => {
            if (updatedPost._id === params.threadId) {
                setPost(updatedPost);
                setHasLiked(updatedPost.likes.includes(auth?._id));
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, params.threadId]);

    const handleClickLike = async () => {
        if (params.threadId) {
            try {
                const action = hasLiked ? 'unlike' : 'like';
                await axios.post(`/api/v2/feature/${params.threadId}/${action}`, null, { // Second argument is data, which is null in this case
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
        if (params.threadId) {
            try {
                await axios.post(`/api/v2/feature/${params.threadId}/dislike`,null,{
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

    if (!post) return <div>Loading...</div>;
   
    const createdAtDate = new Date(post.createdAt);
    const updatedAtDate = new Date(post.updatedAt);
    const formattedDate = createdAtDate.toLocaleString();
    const updateDate = updatedAtDate.toLocaleString();

    return (
        <div className='min-h-screen h-screen flex justify-center '>
            <div className='md:flex'>
                <div className=' max-w-md mx-auto mt-2'>
                    <img className=' h-80 md:h-full w-full object-cover' src={post?.avatar} alt="post" />
                </div>
                <div className='w-full flex flex-col mx-auto py-3'>
                    <div className='flex flex-col justify-center items-center gap-4 w-full'>
                        <h1 className='font-serif font-semibold text-2xl text-center '>{post.title}</h1>
                        <p className='font-sans text-neutral-500 text-center text-sm'>{post.description}</p>
                        <div className='flex w-full justify-around text-neutral-800'>
                            <h1>{formattedDate}</h1>
                            <h1>{updateDate}</h1>
                        </div>
                        <div className="flex items-center gap-5 justify-between py-1">
                            <Button onClick={handleClickLike} className={`flex items-center gap-2 ${hasLiked ? 'text-red-500' : ''}`}>

                                {hasLiked ? <Heart className={`${hasLiked ? 'text-red-500' : ''}`} /> : <HeartOff />}
                                {post.likes.length}
                            </Button>
                            <Button onClick={handleClickDisLike} className="flex items-center gap-2">
                                Dislike ({post.dislikes.length})
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
