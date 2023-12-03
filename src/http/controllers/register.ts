import { registerUseCase } from "@/use-cases/register"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"



export async function register(request: FastifyRequest, reply: FastifyReply) {
    
    const registerSchemaBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerSchemaBody.parse(request.body)

    try {
        await registerUseCase({
            name,
            email,
            password
        })
    } catch(error) {
        return reply.status(409).send() //409 houve conflito
    }

    return reply.status(201).send()
}