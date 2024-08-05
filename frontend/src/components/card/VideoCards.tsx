import axios from 'axios'
import { Link } from 'react-router-dom'
import { CardIs } from './Card'
import { useLoaderData } from 'react-router-dom'

export default function VideoCards() {
  // const [videos, setVideos] = useState([])
  const videos:any = useLoaderData()
console.log("videos",videos)


  return (

    <div className=' py-2 px-2'>
      <h1 className=' text-2xl font-serif mb-1'>
        Videos Posts
      </h1>
      <div className="grid gap-4 px-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {videos.map((video: any) => (
          <div key={video._id} >
            <Link to={`/onevideo/${video._id}`} >
              <CardIs
                title={video.title}
                description={video.description}
                avatar={video.thumbnail}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
}

// react loader use

export const fetchVideocards = async () => {
  try {
    const response = await axios.get('/api/v1/videos/video'); // Ensure the API base URL is correctly configured
    return response.data.data; // Adjust this based on your API response structure
  } catch (error) {
    console.error("Video response Error:", error);
    return null; // Consider throwing the error or handling it in a way that provides feedback
  }
};
