import { UsersRepository } from "@/repositories/prisma/users-repository"
import { User } from "@prisma/client"
import { InvalidCredentialErrors } from "./errors/invalid-credential-errors"
import { compare } from "bcryptjs"

interface RegisterUseCaseRequest {
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User // vem do prisma/client
}

export class AuthenticateUseCase {

    private usersRepository: UsersRepository
    
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialErrors()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches) {
            throw new InvalidCredentialErrors()
        }

        return { user }
    }
    
}

//buscar o usuario no banco pelo e-mail
// comparar se senha salva no banco bate com a senha do parametro