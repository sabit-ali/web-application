
import { NavLink } from 'react-router-dom'

export default function RightSide() {
  return (
    <div className=" md:block hidden rounded-xl overflow-hidden mt-40 ">
      <nav className="w-52 overflow-hidden flex justify-center bg-gray-900">

        <ul className="flex flex-col justify-start gap-4 items-center font-serif h-full w-full py-10 px-6">
          <NavLink to={'/threads'}
            className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
          >Create-Threads</NavLink>
          <NavLink to={'/upload-video'}
            className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
          >Upload-video</NavLink>

          <NavLink to={'/contact-us'}
            className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
          >Contact Us</NavLink>
        </ul>

      </nav>
    </div>
  )
}
