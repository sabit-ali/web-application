import {z} from 'zod'

export const SignUpSchema = z.object({
    name: z.string(),
    username : z.string(),
    email :z.string().email(),
    avatar : z.string(),
    password :z.string().min(7,{message:"Password must be at least 7 digits."}),
})