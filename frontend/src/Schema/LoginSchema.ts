import {z} from 'zod'

export const LoginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(7,{message: "Password must be at least 7 digits."})
})