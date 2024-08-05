import {z} from 'zod'

export const profileUpdateSchema = z.object({
    name : z.string().min(3,{message : "atlest 3 characters"}),
    email : z.string().email()
})