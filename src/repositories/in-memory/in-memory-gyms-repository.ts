import { Gym } from "@prisma/client"
import { GymRepository } from "../gym-repository"

export class InMemoryGymsRepository implements GymRepository {
    
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id) //retorno undefined se n encontrar

        if (!gym) {
            return null
        }

        return gym
    }
    
}
