import { InvalidCredentialErrors } from "@/use-cases/errors/invalid-credential-errors"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"



export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {

        const authenticateUseCase = makeAuthenticateUseCase()
        await authenticateUseCase.execute({
            email,
            password
        })
    } catch (error) {
        if (error instanceof InvalidCredentialErrors) {
            return reply.status(400).send({ message: error.message }) //bad request // introducao de forma errada
        }

        throw error //deixa uma camada acima do controller tratar
    }

    return reply.status(200).send()
}