import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameId = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameId) {
        throw new Error('Email already Exists')
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })
}