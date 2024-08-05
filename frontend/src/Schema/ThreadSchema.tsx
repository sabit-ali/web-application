import {z} from 'zod'

export const ThreadSchema = z.object({
    title : z.string().min(3,{message : "title must be at least 3 characters."}),
    description : z.string().min(20,{message : "description must be at least 20 characters."}).max(50,{message:"max ,..description must be at least 50 characters"}),
    avatar : z.string()
})