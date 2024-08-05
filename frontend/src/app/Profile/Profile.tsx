import { ProfileRightSideForm } from "@/components/form/ProfileRightSideForm";
import axios from "axios";
import { useEffect, useState } from "react";

import UserAuth from "@/utils/UserAuth";
import Accesstoken from "@/utils/AccessToken";
import Socket from "@/utils/Socket";
import ProfileTabs from "./ProfileTabs";
import { useLoaderData } from "react-router-dom";

interface AvatarType {
  avatar: string;
}



export default function Profile() {
  const [isAvatar, setIsAvatar] = useState<AvatarType>();
 
  const user = UserAuth();
 
  const socket = Socket();
  const profile:any = useLoaderData()
  console.log("profile",profile)
  const proArray = profile.threadInside
  const videos = profile.videos
 
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on('updateProfileAvatar', (updatedAvatar) => {
      setIsAvatar(updatedAvatar);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      {user ? (
        <>
          <div className="w-full mt-10">
            <div className="flex items-center gap-5 justify-center">
              <div className="space-y-2 mt-2 mb-2">
                {isAvatar?.avatar ? (
                  <img className="w-24 h-24 rounded-full object-cover" src={isAvatar?.avatar} alt="" />
                ) : (
                  <img className="w-24 h-24 rounded-full object-cover" src={profile?.avatar} alt="" />
                )}
              </div>
              <div className="flex flex-col dark:text-orange-500">
                <div className="flex gap-1">
                  <label className="font-serif uppercase underline -tracking-tighter">name</label>
                  <h2 className="font-semibold font-mono dark:text-green-500">: {profile?.name}</h2>
                </div>
                <div className="flex gap-1">
                  <label className="font-serif uppercase underline -tracking-tighter">username</label>
                  <h2 className="font-semibold font-mono dark:text-green-500">: {profile?.username}</h2>
                </div>
                <div className="flex gap-1">
                  <label className="font-serif uppercase underline -tracking-tighter">email</label>
                  <h2 className="font-semibold font-mono dark:text-green-500">: {profile?.email}</h2>
                </div>
              </div>
              <ProfileRightSideForm />
            </div>
          </div>
          <div className="w-full">
            <ProfileTabs mythreads={proArray} videoposts={videos} />
          </div>
        </>
      ) : (
        <div>
          <h1>Please Login First</h1>
        </div>
      )}
    </>
  );
}
// react router loader use



export const fetchUserProfile = async (username:string | undefined) => {
  
  const accessToken = Accesstoken(); 

  try {
    const response = await axios.get(`/api/v1/users/get-username-profile/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true,
    });
    return response.data.data[0]; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response('Error fetching data', { status: 500 }); // Return an error response
  }
};