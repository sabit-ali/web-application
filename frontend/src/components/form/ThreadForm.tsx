
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'

import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ThreadSchema } from '@/Schema/ThreadSchema'
import { ChangeEvent, useState } from 'react'
import { Textarea } from '../ui/textarea'
import Accesstoken from '@/utils/AccessToken'

export default function ThreadForm() {
  
  const [avatar, setImage] = useState<File[]>([])
  const accessToken = Accesstoken()
  const [isLoading , setIsLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof ThreadSchema>>({
    resolver : zodResolver(ThreadSchema),
    defaultValues :{
      title :'',
      description : '',
      avatar : '',
    }
  })

  const handleAvatar = (e:ChangeEvent<HTMLInputElement>,fieldChange : (value :string)=> void)=>{
    e.preventDefault()

    const fileReader = new FileReader()

    if(e.target.files && e.target.files.length > 0){
      const file = e.target.files[0]
      setImage(Array.from(e.target.files))
      
      fileReader.onload = async (event) =>{
       const imageDataUrl =  event.target?.result?.toString() || "";
       fieldChange(imageDataUrl)
      }
      fileReader.readAsDataURL(file)
    } 
  }

  const onSubmit = async (data:z.infer<typeof ThreadSchema>)=>{
    setIsLoading(true)

    const dataForm = new FormData()
    dataForm.append("title",data.title)
    dataForm.append("description",data.description)
    dataForm.append("avatar",avatar[0])
    
    try {
      await axios.post('/api/v1/thread/upload-thread',dataForm,{
        headers: {
          Authorization: `Bearer ${accessToken}` // Set the Authorization header
      },
      withCredentials: true, // Include credentials if needed
      })
      .then((data)=>{
        setIsLoading(false)
      
        toast.success(data.data.message)
        navigate("/threads")
      })
    } catch (error:any) {
      setIsLoading(false)
      toast.error(error.message)
   
    }
  }

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4 w-full '>
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
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  field.value ? (
                    <>
                      <div>
                        <img src={field.value} className=' object-cover h-24 w-24 rounded-sm' alt="Image" />
                      </div>
                    </>
                  ) : ("Image")
                }
              </FormLabel>
              <FormControl>
                <Input 
                type='file'
                accept='image/*'
                onChange={(e)=> handleAvatar(e,field.onChange)}
                 />
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
              <FormLabel>Write thread</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your thread here." {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (<> <Loader2 className=' animate-spin'/> "please wait" </>) : (
            <span>Upload thread</span>
          )}
        </Button>
      </form>
    </Form>

  )
}
