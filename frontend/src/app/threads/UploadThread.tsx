import ThreadForm from "@/components/form/ThreadForm";


export default function UploadThread() {
  return (
    <div  className=' h-screen w-full mx-auto flex flex-col justify-center items-center'>
      <h1 className=" text-2xl md:text-3xl font-bold font-serif text-neutral-950">Write Your fav thread</h1>
    <p className=" text-sm md:text-md font-semibold  ">your feel is mether</p>
    <div className=" mt-10 w-full px-5 md:px-10">
        <ThreadForm/>
    </div>
    </div>
  )
}
