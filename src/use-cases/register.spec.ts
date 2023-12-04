import { test, describe, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists.error'

describe('Register Use Case', () => {
    test('should be able to register', async () => {
        const usersRepositoryInMemory = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepositoryInMemory)

        const { user } = await registerUseCase.execute({
            name: 'joe dohm',
            email: 'dsad@hotmail.com',
            password: '123456'

        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('should hash user password upon registration', async () => { //in memory test databse
        const usersRepositoryInMemory = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepositoryInMemory)

        const { user } = await registerUseCase.execute({
            name: 'joe dohm',
            email: 'dsad@hotmail.com',
            password: '123456'

        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    }) 

    test('user should not be able to create a email with same email', async () => {
        const usersRepositoryInMemory = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepositoryInMemory)

        const email = 'dsad@hotmail.com'

        await registerUseCase.execute({
            name: 'joe dohm',
            email,
            password: '123456'

        })

        expect(registerUseCase.execute({
            name: 'joe dohm',
            email,
            password: '123456'

        })).rejects.toBeInstanceOf(UserAlreadyExists)
    }) 
})