import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymRepository } from "@/repositories/gym-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found"


interface CheckInUseCaseRequest {
    userId: string
    gymId: string  //qual acdemia usuario ta tentando fazer check in
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn // vem do prisma/client
}

export class CheckInUseCase {

    private checkInsRepository: CheckInsRepository
    private gymsRepository: GymRepository

    constructor(checkInsRepository: CheckInsRepository, gymsRepository: GymRepository) {
        this.checkInsRepository = checkInsRepository
        this.gymsRepository = gymsRepository //primeiro caso de uso recebendo duas dependencias
    }


    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFound()
        }

        //calculate distance between user and gym

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDay) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return { checkIn }
    }
    
}