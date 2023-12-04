import { test, describe, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
    test('should hash user password upon registration', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null
            },

            async create(data) {
                return {
                    id: 'user1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }
            },
        })

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
})