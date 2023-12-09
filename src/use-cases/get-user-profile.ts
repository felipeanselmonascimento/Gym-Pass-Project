import { UsersRepository } from "@/repositories/prisma/users-repository"
import { User } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found"

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User // vem do prisma/client
}

export class GetUserProfileUseCase {

    private usersRepository: UsersRepository
    
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {

        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFound()
        }

        return { user }
    }
    
}