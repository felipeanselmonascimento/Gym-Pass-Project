import { expect, describe, test } from "vitest"
import { AuthenticateUseCase } from "./authenticate"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { InvalidCredentialErrors } from "./errors/invalid-credential-errors"


describe('Authenticate Use Case', () => {
    test('should be able to authenticate', async () => {
        const usersRepositoryInMemory = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepositoryInMemory)

        await usersRepositoryInMemory.create({
            name: 'malandro',
            email: '1234@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: '1234@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('should be able to authenticate with wrong email', async () => {
        const usersRepositoryInMemory = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepositoryInMemory)

        await expect(sut.execute({
            email: '1234@gmail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialErrors)
    })

    test('should be able to authenticate with wrong password', async () => {
        const usersRepositoryInMemory = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepositoryInMemory)

        await usersRepositoryInMemory.create({
            name: 'malandro',
            email: '1234@gmail.com',
            password_hash: await hash('123456', 6)
        })

        await expect(sut.execute({
            email: '1234@gmail.com',
            password: '123556'
        })).rejects.toBeInstanceOf(InvalidCredentialErrors)
    })
})