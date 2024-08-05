
import { SignUpSchema } from '@/Schema/SignUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const SignupForm = () => {

  const [avatar,setAvatar] = useState<File[]>([])

    const form = useForm<z.infer<typeof SignUpSchema>>({
      resolver : zodResolver(SignUpSchema),
      defaultValues :{
        name :'',
        username : '',
        email : '',
        password : '',
        avatar : "",
      }
    })

    const onSubmit = async (data:z.infer<typeof SignUpSchema>)=>{
      const formData = new FormData()
      formData.append("avatar",avatar[0])
      formData.append("name",data.name)
      formData.append("username",data.username)
      formData.append("email",data.email)
      formData.append("password",data.password)

      try {
        await axios.post('api/v1/users/register',formData)
        .then(()=>{
          toast.success("User registerd successfully")
        })
      } catch (error:any) {
        toast.error(error.response?.data?.message)
      }
    }

    const handleAvatar = async (e:ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault()
      if(e.target.files && e.target.files.length > 0){
        setAvatar(Array.from(e.target.files))
      }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4'>
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input type='file' accept='image/*' onChange={(e)=> handleAvatar(e)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign-in</Button>
      </form>
    </Form>

  )
}
