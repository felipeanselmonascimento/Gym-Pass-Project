import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { beforeEach, describe, test, expect } from "vitest"
import { GetUserMetricsUseCase } from "./get-user-metrics"



let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })


    test('should be able to get check-ins count from metrics', async () => {

        await checkInsRepository.create(
            {
                gym_id: 'gym 1',
                user_id: '01'
            }
        )

        await checkInsRepository.create(
            {
                gym_id: 'gym 2',
                user_id: '01'
            }
        )

        const { checkInsCount } = await sut.execute({
            userId: '01',
        })

        expect(checkInsCount).toEqual(2)
        

    })

})