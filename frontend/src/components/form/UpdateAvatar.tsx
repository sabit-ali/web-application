import { ChangeEvent, useState } from "react"
import { Button } from "../ui/button"
import axios from "axios"
import { toast } from "react-toastify"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import {  useForm } from "react-hook-form"
import Accesstoken from "@/utils/AccessToken"

export default function UpdateAvatar() {
  const accessToken = Accesstoken()

    const [file,setFile] = useState<File[]>([])

    const form = useForm()
    const onSubmit = async ()=>{
        const formData = new FormData()
        formData.append("avatar",file[0])
        
        try {
            await axios.post(`/api/v1/users/avatar-update`,formData,{
              headers: {
                Authorization: `Bearer ${accessToken}` // Set the Authorization header
            },
            withCredentials: true, // Include credentials if needed
              
            })
            .then(()=>{
                toast.success("avatar change successfully")
            }).catch((error)=>{
                toast.error(error)
            })
        } catch (error:any) {
            toast.error(error.message)
        }
        
    }
    const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>, field: (value: string) => void) => {
        e.preventDefault()

        const fileReader = new FileReader()

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
           
            setFile(Array.from(e.target.files))


            fileReader.onload = async (event) => {
                const imgDataUrl = event.target?.result?.toString() || ""
                field(imgDataUrl)
            }
            fileReader.readAsDataURL(file)

        }

    }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-col mt-10 shadow-sm flex h-40 items-center justify-center">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
                {field.value ? (
                    <>
                        <img src={field.value} className=" h-24 w-24 object-cover rounded-sm" />
                    </>
                ) : ("avatar")}
            </FormLabel>
            <FormControl>
              <Input accept="image/*" type="file" onChange={(e)=> handleAvatarChange(e,field.onChange) } />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}
