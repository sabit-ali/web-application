import { logOut } from "@/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios";
import { toast } from "react-toastify";
import UserAuth from "@/utils/UserAuth";
import Accesstoken from "@/utils/AccessToken";
import { ModeToggle } from "../mode-toggle";

export default function TopBar() {

  const accessToken = Accesstoken()
  const dispatch = useDispatch()
  const auth = useSelector((state: any) => state.user)
  const user = UserAuth()

  const logOutHandler = async () => {
    try {
      await axios.post(`/api/v1/users/logout-user`,null,{
        headers :{
          Authorization: `Bearer ${accessToken}` // Set the Authorization header
        },
        withCredentials :true
      })
        .then(() => {
          toast.success("logout User success")
          dispatch(logOut())
        })
    } catch (error) {
      console.log("LogOut Error", error)
    }
  }

  return (
    <nav className=" flex mx-auto h-14 justify-between px-4 py-3">
      <img src="/assets/logo.svg" />
      <h1 className="  uppercase  font-serif text-xl ">Aliz Application</h1>
      <ul className=" md:flex hidden gap-20">
        <NavLink to={'/'}
          className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
        >Home</NavLink>
        <NavLink to={'/threads'}
          className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
        >Threads</NavLink>
        <NavLink to={'/video'}
          className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
        >Videos</NavLink>
        <NavLink to={`/profile/${auth?.username}`}
          className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
        >
          Profile
        </NavLink>
        <ModeToggle/>
      </ul>

      <div className=" md:block hidden">

        {!user ? <NavLink to={'/sign-up'} className=" px-2 py-1 border rounded-md ">
          sign-up
        </NavLink> : <button onClick={() => logOutHandler()} className=" px-2 py-1 border rounded-md ">
          log-out
        </button>}

      </div>
      <div className=" md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">features</Button>
          
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>All features here</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4 bg-gray-600">
              <div className=" border border-purple-500 bg-gray-950 text-orange-500 gap-4 ">

                <ul className=" flex flex-col  gap-2 justify-center items-center py-2">
                  <NavLink to={'/upload-thread'}
                    className={({ isActive }) => `${isActive ? " text-red-500" : ""} border px-2  rounded-sm border-purple-700 hover:bg-white`}
                  >Create-Threads</NavLink>
                  <NavLink to={'/upload-video'}
                    className={({ isActive }) => `${isActive ? " text-red-500" : ""} border px-2  rounded-sm border-purple-700 hover:bg-white`}
                  >Upload-video</NavLink>
                </ul>
                <ModeToggle/>
              </div>
            </div>
            <DialogFooter>
              <div className=" bg-red-500 text-white px-2 rounded-sm ">
                <button onClick={() => logOutHandler()} className=" px-2 py-1 max-w-md rounded-md font-serif ">
                  log-out
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  )
}
