import { test, describe, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists.error'
import { beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    test('should be able to register', async () => {

        const { user } = await sut.execute({
            name: 'joe dohm',
            email: 'dsad@hotmail.com',
            password: '123456'

        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('should hash user password upon registration', async () => { //in memory test databse

        const { user } = await sut.execute({
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

        const email = 'dsad@hotmail.com'

        await sut.execute({
            name: 'joe dohm',
            email,
            password: '123456'

        })

        await expect(sut.execute({
            name: 'joe dohm',
            email,
            password: '123456'

        })).rejects.toBeInstanceOf(UserAlreadyExists)
    }) 
})