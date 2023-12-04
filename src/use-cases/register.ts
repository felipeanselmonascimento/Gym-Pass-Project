import { UsersRepository } from "@/repositories/prisma/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists.error"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {

    private usersRepository: UsersRepository

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExists()
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash
        })

    }
}

