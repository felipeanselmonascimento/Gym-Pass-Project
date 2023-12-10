import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { describe, beforeEach, test, expect, vi, afterEach } from "vitest"
import { CheckInUseCase } from "./check-in"


let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(
        () => {
            vi.useRealTimers()
        }
    )

    test('should be able to check in', async () => {

        
        const { checkIn } = await sut.execute({
            userId: '14353',
            gymId: 'gymdelloco'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    test('should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) //dois checkins criados na mesma data

        await sut.execute({
            userId: '14353',
            gymId: 'gymdelloco'
        })
        
        await expect(
            () => sut.execute({
                userId: '14353',
                gymId: 'gymdelloco'
            })
        ).rejects.toBeInstanceOf(Error)
    })
    
    test('should be able to check in twice in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) //dois checkins criados na mesma data

        await sut.execute({
            userId: '14353',
            gymId: 'gymdelloco'
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        
        const { checkIn } = await sut.execute({
                userId: '14353',
                gymId: 'gymdelloco'
            })

        expect(checkIn.id).toEqual(expect.any(String))
        
    })
    
    
})