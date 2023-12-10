import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { describe, beforeEach, test, expect } from "vitest"
import { CheckInUseCase } from "./check-in"


let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })

    test('should be able to check in', async () => {

        
        const { checkIn } = await sut.execute({
            userId: '14353',
            gymId: 'gymdelloco'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
    
})