import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function BootomBar() {
  const auth = useSelector((state:any)=> state.user)
  return (
    <div >
          <nav className="  w-full flex justify-center items-center rounded-xl">
      <ul className="md:hidden  flex gap-20">
        <NavLink to={'/'}
          className={({ isActive }) => `${isActive ? "  " : ""} `}
        >
          <img  className=" h-14 w-14 "  src="/assets/ishome.png" alt="" />
        </NavLink>
        <NavLink to={'/threads'}
          className={({ isActive }) => `${isActive ? " bg-white " : ""} `}
        >
           <img  className=" h-14 w-14" src="/assets/message.svg" alt="" />
        </NavLink>
        <NavLink to={'/video'}
          className={({ isActive }) => `${isActive ? " bg-white " : ""} `}
        >
           <img  className=" h-14 w-14" src="/assets/video.svg" alt="" />
        </NavLink>
        <NavLink to={`/profile/${auth?.username}`}
          className={({ isActive }) => `${isActive ? " bg-white " : " "} `}
        >
           <img  className=" h-14 w-14" src="/assets/contact.svg" alt="" />
        </NavLink>
      </ul>
    </nav>
    </div>
  )
}
