import { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { hash } from "bcryptjs"


export async function register(request: FastifyRequest, reply: FastifyReply) {
    
    const registerSchemaBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerSchemaBody.parse(request.body)

    const password_hash = await hash(password, 6)

    const userWithSameId = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameId) {
        return reply.status(409).send() //409 tem conflito
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })

    return reply.status(201).send()
}