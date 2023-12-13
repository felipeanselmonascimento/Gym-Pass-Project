//fetch é mais de uma informacao

import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client"

interface fetchUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
}

interface fetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[] // vem do prisma/client
}

export class FetchUserCheckInsHistoryUseCase {

    private checkInsRepository: CheckInsRepository

    constructor(checkInsRepository: CheckInsRepository) {
        this.checkInsRepository = checkInsRepository
    }


    async execute({ userId, page }: fetchUserCheckInsHistoryUseCaseRequest): Promise<fetchUserCheckInsHistoryUseCaseResponse> {

        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return { checkIns }
    }
    
}