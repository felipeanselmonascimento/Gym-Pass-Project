import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym"
import { describe, beforeEach, test, expect } from "vitest"


let createGymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {

    beforeEach(() => {
        createGymRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(createGymRepository)
    })

    test('should be able to create a gym', async () => {

        const { gym } = await sut.execute({
            title: 'seila',
            description: 'description',
            phone: '35422553',
            latitude: 53.3598446,
            longitude: -2.7335209
        })
//53.3598446,-2.7335209
        expect(gym.title).toEqual('seila')
    })
})


//ctrl + d
// ctrl + shift + l