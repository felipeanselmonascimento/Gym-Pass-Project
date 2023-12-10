import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client"


interface CheckInUseCaseRequest {
    userId: string
    gymId: string  //qual acdemia usuario ta tentando fazer check in
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn // vem do prisma/client
}

export class CheckInUseCase {

    private checkInsRepository: CheckInsRepository
    
    constructor(checkInsRepository: CheckInsRepository) {
        this.checkInsRepository = checkInsRepository
    }

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        if (!checkIn) {
            throw new Error()
        }


        return { checkIn }
    }
    
}