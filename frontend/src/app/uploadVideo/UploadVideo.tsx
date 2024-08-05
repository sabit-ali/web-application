import UploadVideoForm from "@/components/form/UploadVideoForm";

export default function UploadVideo() {

  return (
    <div  className=' h-screen w-full mx-auto flex flex-col justify-center items-center'>
      <h1 className=" text-2xl md:text-3xl font-bold font-serif text-neutral-950">Upload Your fav Video</h1>
    <p className=" text-sm md:text-md font-semibold  ">your feel is mether</p>
    <div className=" mt-10 w-full px-5 md:px-10">
        <UploadVideoForm/>
    </div>
    </div>
  )
}
