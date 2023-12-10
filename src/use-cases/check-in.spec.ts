import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { describe, beforeEach, test, expect, vi, afterEach } from "vitest"
import { CheckInUseCase } from "./check-in"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"


let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        gymsRepository.items.push({
            id: 'gymdelloco',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        })

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
            gymId: 'gymdelloco',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    test('should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) //dois checkins criados na mesma data

        await sut.execute({
            userId: '14353',
            gymId: 'gymdelloco',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(
            () => sut.execute({
                userId: '14353',
                gymId: 'gymdelloco',
                userLatitude: 0,
                userLongitude: 0
            })
        ).rejects.toBeInstanceOf(Error)
    })

    test('should be able to check in twice in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: '14353',
            gymId: 'gymdelloco',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: '14353',
            gymId: 'gymdelloco',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    test('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gymdelloco3',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(53.3605412),
            longitude: new Decimal(-2.9216024)
        })

        await expect(() => sut.execute({
            userId: '14353',
            gymId: 'gymdelloco3',
            userLatitude: 53.3598446,
            userLongitude: -2.7335209
        }),
        ).rejects.toBeInstanceOf(Error)

        //53.3598446,-2.7335209
    })


})