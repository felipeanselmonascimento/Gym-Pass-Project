import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history"
import { beforeEach, describe, test, expect } from "vitest"



let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check Ins History Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
    })


    test('should be able to fetch check-in history', async () => {

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

        const { checkIns } = await sut.execute({
            userId: '01',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym 1' }),
            expect.objectContaining({ gym_id: 'gym 2' }),
        ])

    })

    test('should be able to fetch paginated check-in history', async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create(
                {
                    gym_id: `gym ${i}`,
                    user_id: '01'
                }
            )
        }

        const { checkIns } = await sut.execute({
            userId: '01',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym 21' }),
            expect.objectContaining({ gym_id: 'gym 22' }),
        ])

    })

})