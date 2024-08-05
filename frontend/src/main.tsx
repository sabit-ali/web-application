
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements , Route , RouterProvider} from 'react-router-dom'
import {
  Layout,
} from './index.ts'

import {
  Threads,
  UploadVideo,
} from './index.ts'
import Signup from './auth/sign-up/Signup.tsx'
import Login from './auth/login/Login.tsx'
import UploadThread from './app/threads/UploadThread.tsx'
import { Videos } from './app/uploadVideo/Videos.tsx'
import { Home } from './app/home/Home.tsx'
import {Provider} from 'react-redux'
import { store } from './store/auth/store.ts'
import RequireAuth from './utils/AuthRequires.tsx'
import OnePage from './app/threads/OnePage.tsx'
import OneVideo from './app/uploadVideo/OneVideo.tsx'
import ProfileUpdate from './auth/update/profile/ProfileUpdate.tsx'
import Profile, { fetchUserProfile } from './app/Profile/Profile.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import { fetchData } from './components/card/ThreadsCards.tsx'
import { fetchVideocards } from './components/card/VideoCards.tsx'





const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path='/' element={<Layout />}>

      {/* public routes */}
      <Route path='/' element={<Home />} />
      <Route
      loader={fetchData}
       path='/threads' element={<Threads />} />
      <Route path='/onethread/:threadId' element={<OnePage />} />
      <Route
      loader={fetchVideocards}
       path='/video' element={<Videos />} />
      <Route path='/onevideo/:videoId' element={<OneVideo />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/sign-in' element={<Login />} />


      

     
       
  
      
    <Route element={<RequireAuth/>}>
      <Route path='/upload-thread' element={<UploadThread />} />
      <Route path='/profile-update' element={<ProfileUpdate />} />
      <Route
    path="/profile/:username"
    element={<Profile />}
    loader={({ params }) => fetchUserProfile(params.username)} // Ensure this matches your route parameter
  />
      <Route path='/upload-video' element={<UploadVideo />} />
    </Route>





    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
</ThemeProvider>
  
)
