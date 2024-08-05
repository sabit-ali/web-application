
import { TopBar, BootomBar, LeftSide } from '../index.ts'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function layout() {
  return (
    <>
    <div className=' w-full h-screen'>

    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <TopBar />
      

      <main className='flex flex-row justify-start'>
        <LeftSide />
        <section className=' flex w-full'>
          <div className=' flex flex-col mx-auto  w-full overflow-y-auto'>
          
            <Outlet />

          </div>
        </section>
        {/* <RightSide /> */}
      </main>

    
      <div className=' bottom-[0] dark:bg-white/60 bg-white/50 fixed w-full '>
      <BootomBar />
      </div>
      
    </div>
    </>
  )
}
