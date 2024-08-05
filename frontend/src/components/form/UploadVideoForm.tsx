import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { VideoSchema } from '@/Schema/VideoSchema'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Textarea } from '../ui/textarea'
import Accesstoken from '@/utils/AccessToken'

export default function UploadVideoForm() {
  const accessToken = Accesstoken()
  const [isLoading , setIsLoading] = useState(false)
  const [file,setFile] = useState<File[]>([])
  const [thum,setThumbanil] = useState<File[]>([])
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof VideoSchema>>({
    resolver : zodResolver(VideoSchema),
    defaultValues :{
      title :'',
      description : '',
      video : '',
      thumbnail : '',
    }
  })

  const onSubmit = async (data:z.infer<typeof VideoSchema>)=>{
    setIsLoading(true)
    const formData = new FormData()
    formData.append("video",file[0])
    formData.append("thumbnail",thum[0])
    formData.append("title",data.title)
    formData.append("description",data.description)
   


    try {
      await axios.post('/api/v1/videos/upload',formData,{
        headers: {
          Authorization: `Bearer ${accessToken}` // Set the Authorization header
      },
      withCredentials: true, // Include credentials if needed
      })
      .then((data)=>{
        setIsLoading(false)
      
        toast.success(data.data.message)
        navigate("/video")
      })
    } catch (error:any) {
      setIsLoading(false)
      toast.error(error.message)
  
    }
  }

  const handleVideoFile = async (e:ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    if(e.target.files && e.target.files.length > 0){
      setFile(Array.from(e.target.files))
    }else{
      toast.error("video file is required !")
    }
  }
  

  const handleThumbnail = async (e:ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    if(e.target.files && e.target.files.length > 0){
      setThumbanil(Array.from(e.target.files))
    }else{
      toast.error("video file is required !")
    }
  }
  
  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4'>
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='description' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video"
          render={() => (
            <FormItem>
              <FormLabel>Video</FormLabel>
              <FormControl>
                <Input type='file' onChange={(e)=> handleVideoFile(e) }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input type='file' accept='image/*' onChange={(e)=> handleThumbnail(e)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (<> <Loader2 className=' animate-spin'/> "please wait" </>) : (
            <span>Continue</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
