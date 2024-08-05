import LoginForm from "@/components/form/LoginForm";

export default function Login() {
  return (
    <div className=" w-full mx-auto  h-screen flex flex-col items-center space-y-10 md:max-w-6xl dark:bg-black ">
      <div className=" mt-40">
      <div className="mx-auto flex flex-col justify-center items-center mb-10">
          <h1 className=" md:text-3xl text-2xl font-serif font-semibold">Welcome to Aliz application</h1>
          <p className=" text-sm font-mono font-semibold">please <span className=" px-1 py-[4px] bg-green-500">Sign-in</span></p>
        </div>
        <div className=" flex flex-col mx-auto justify-center items-center"> 
            <LoginForm/>
        </div>
      </div>
    </div>
  )
}
