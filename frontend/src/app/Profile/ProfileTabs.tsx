import { CardIs } from "@/components/card/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Link } from "react-router-dom";

interface Thread {
  _id: string;
  title: string;
  avatar: string;
  description: string;
}

interface Video {
  _id: string;
  description: string;
  thumbnail: string;
  title: string;
  videoFile: string;
}

interface ProfileTabsProps {
  mythreads: Thread[];
  videoposts: Video[];
}

export default function ProfileTabs({ mythreads, videoposts }: ProfileTabsProps) {

    
  return (
    <div className="w-full mx-auto flex justify-center">
      <Tabs defaultValue="account" className="w-full flex flex-col justify-center items-center">
        <TabsList className="mx-auto flex justify-evenly w-full">
          <TabsTrigger value="account">
            Threads 
            <span className="text-sm font-semibold text-green-500 ml-1 border rounded-sm shadow-sm px-2">
              {mythreads.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="password">
            Videos 
            <span className="text-sm font-semibold text-green-500 ml-1 border rounded-sm shadow-sm px-2">
              {videoposts.length}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="w-full">
          <h1>My Threads</h1>
          <div className=" w-full md:max-w-6xl py-2 grid md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
            {mythreads.map((thread) => (
              <div
                key={thread._id}
                className="w-full relative h-screen "
              >
                <Link to={`/onethread/${thread._id}`}>
                  <CardIs
                    title={thread.title}
                    description={thread.description}
                    avatar={thread.avatar}
                  />
                </Link>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="password" className="w-full">
          <h1>My Videos</h1>
          <div className="grid gap-4 px-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {videoposts.map((video) => (
              <div
                key={video._id}
                className="bg-gray-700 border max-w-sm mx-auto md:max-w-md"
              >
                <Link to={`/video/${video._id}`}>
                  <CardIs
                    title={video.title}
                    description={video.description}
                    avatar={video.thumbnail}
                  />
                </Link>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
