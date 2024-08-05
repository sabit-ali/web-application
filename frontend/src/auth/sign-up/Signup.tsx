import { SignupForm } from "@/components/form/SignupForm";
import { NavLink } from "react-router-dom";


export default function Signup() {
  return (
    <div className=" w-full flex flex-col justify-center items-center space-y-10  mt-5 md:max-w-6xl dark:bg-black ">
        <div className="mx-auto flex flex-col justify-center items-center">
          <h1 className=" md:text-3xl text-2xl font-serif font-semibold">Welcome to Aliz application</h1>
          <p className=" text-sm font-mono font-semibold">please Register as <span className=" px-1 uppercase bg-green-500 rounded-md text-center p-[1px] ">member</span> aur famliy</p>
        </div>
        <div className=" flex flex-col mx-auto justify-center items-center"> 
            <SignupForm/>
        </div>
        <div className=" mx-auto text-center ">
          <p className=" text-sm text-neutral-300">have an account ? <span className=" underline text-green-600 text-base cursor-pointer "> 
          <NavLink to={'/sign-in'}>
          log-in
          </NavLink>  
          </span></p>
        </div>
    </div>
  )
}
