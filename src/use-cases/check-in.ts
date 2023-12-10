import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymRepository } from "@/repositories/gym-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-betwen-coordinates"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"
import { MaxDistanceError } from "./errors/max-distance-error"


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


    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFound()
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return { checkIn }
    }
    
}