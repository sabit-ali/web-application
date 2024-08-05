import ProfileUpdateForm from "@/components/form/ProfileUpdateForm";
import { Separator } from "@/components/ui/separator"

export default function ProfileUpdate() {
  return (
    <div  className='  flex flex-col justify-center items-center placeholder-sky-400'>
      <h1 className=" text-2xl md:text-3xl font-bold font-serif text-neutral-950">Profile</h1>
    <p className=" text-sm md:text-md font-semibold  "> <span className=" text-green-500"> update </span>and <span className=" text-red-500">delete</span> this page</p>
    <div className=" mt-10 w-full px-5 md:px-10">
        <ProfileUpdateForm/>
        <Separator className=" mt-4"/>
    </div>
    </div>
  )
}
