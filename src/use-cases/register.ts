import { UsersRepository } from "@/repositories/prisma/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists.error"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User // vem do prisma/client
}

export class RegisterUseCase {

    private usersRepository: UsersRepository

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExists()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user
        }

    }
}

