import { profileUpdateSchema } from '@/Schema/profileUpdateSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Accesstoken from '@/utils/AccessToken'


export default function ProfileUpdateForm() {
    const navigate = useNavigate()
    const accessToken = Accesstoken()
    const form = useForm({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            name: '',
            email: '',
        }
    })


    const onSubmit = async (data: z.infer<typeof profileUpdateSchema>) => {
        try {
            await axios.post(
                `/api/v1/users/profile-update`,
                {
                    name: data.name,
                    email: data.email
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Set the Authorization header
                    },
                    withCredentials: true, // Include credentials if needed
                }
            );
            toast.success("User updated successfully");
            navigate('/'); // Navigate to home or another page after successful update
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error("Failed to update user"); // Notify user about the error
        }
    };
    
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="new name" {...field} />
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
                                    <Input placeholder=" new xyz@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" >Update now</Button>
                </form>
            </Form>
        </div>
    )
}
