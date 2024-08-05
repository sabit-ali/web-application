import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import axios from 'axios'
import { LoginSchema } from '@/Schema/LoginSchema'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/store/auth/authSlice'

export default function LoginForm() {



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues :{
          email : '',
          password : '',
        }
      })

      const onSubmit = async (data:z.infer<typeof LoginSchema>)=>{
  
        try {
         const response =  await axios.post('api/v1/users/login',data,{
          headers: {
            Authorization: `Bearer ` // Set the Authorization header
        },
        withCredentials: true, // Include credentials if needed
         })

            const isData = {
                token : response.data.data.accessToken,
                refreshToken : response.data.data.refreshToken,
                user :  response.data.data.user
            }
            dispatch(
                  setAuth(isData)
                )
                
          toast.success(response.data.message)
         navigate("/")
        } catch (error:any) {
          toast.error(error.message)
        }
      }

      

 return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4'>

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
        <Button type="submit">Login</Button>
      </form>
    </Form>

  )
}
