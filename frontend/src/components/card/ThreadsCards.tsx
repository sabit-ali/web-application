import axios from 'axios';

import { Link } from 'react-router-dom';
import { CardIs } from './Card';
import { useLoaderData } from 'react-router-dom';


export default function ThreadsCards() {

  const threads:any = useLoaderData()
  console.log("isData",threads)

  return (

    <div className=' py-2 px-2'>
      <h1 className=' text-2xl font-serif mb-1'>
        Threads Posts
      </h1>
              <div className="grid gap-4 px-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {threads.map((thread:any) => (
            <div key={thread._id} >
              <Link to={`/onethread/${thread._id}`} >
              <CardIs 
              title={thread.title}
              description={thread.description}
              avatar={thread.avatar}
               />
              </Link>
            </div>
          ))}
        </div>
    </div>

  );
}

// loader use react 
export const fetchData = async () => {
  try {
    const response = await axios.get('/api/v1/thread/getthreads', {
      params: { pageNumber: 1 },

    });
    return response.data.data
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log("fetch threads cards Error",error)
    }
    return null
  }
}