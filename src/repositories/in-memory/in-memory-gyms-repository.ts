import { Gym, Prisma } from "@prisma/client"
import { GymRepository } from "../gym-repository"
import { randomUUID } from "node:crypto"

export class InMemoryGymsRepository implements GymRepository {
    
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id) //retorno undefined se n encontrar

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {

        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null, //prisma n aceita undefined
            phone: data.phone, //obrigatorio no meu
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString())
        }

        this.items.push(gym)

        return gym
    }
    
}
