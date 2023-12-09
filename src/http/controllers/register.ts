import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists.error"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"
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

        const registerUsecase = makeRegisterUseCase()
        await registerUsecase.execute({
            name,
            email,
            password
        })
    } catch (error) {
        if (error instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: error.message }) //409 houve conflito
        }

        throw error //deixa uma camada acima do controller tratar
    }

    return reply.status(201).send()
}