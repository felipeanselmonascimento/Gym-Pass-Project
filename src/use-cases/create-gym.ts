import { GymRepository } from "@/repositories/gym-repository"
import { Gym } from "@prisma/client"


interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym // vem do prisma/client
}

export class CreateGymUseCase {

    private gymsRepositoriry: GymRepository

    constructor(gymsRepositoriry: GymRepository) {
        this.gymsRepositoriry = gymsRepositoriry
    }

    async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

        const gym = await this.gymsRepositoriry.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym
        }

    }
}