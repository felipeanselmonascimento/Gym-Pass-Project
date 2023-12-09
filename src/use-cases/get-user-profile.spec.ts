import { expect, describe, test, beforeEach } from "vitest"
import { GetUserProfileUseCase } from "./get-user-profile" 
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { ResourceNotFound } from "./errors/resource-not-found"


let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get Profile Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    test('should be able to get profile', async () => {

        const createdUser = await usersRepository.create({
            name: 'malandro',
            email: '1234@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('malandro')
    })

    test('should not be able to get user profile with wrong id', async () => {
        expect(() => sut.execute(
            {
                userId: 'non-existing'
            }
        ),
        ).rejects.toBeInstanceOf(ResourceNotFound)

    })


})

