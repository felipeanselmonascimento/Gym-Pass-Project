// parecido com nosso prisma repository

import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../prisma/users-repository";

export class InMemoryUsersRepository implements UsersRepository {

    public items: User[] = []

    async create(data: Prisma.UserCreateInput) {

        const user = {
            id: 'user1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(user)

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find(item => item.email === email) //retorno undefined se n encontrar

        if (!user) {
            return null
        }

        return user
    }
}


   