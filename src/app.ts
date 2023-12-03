import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

prisma.user.create({
    data: {
        name: 'Felipe Anselmo do Nascimento',
        email: 'felipeanselmodonascimento@gmail.com',
    }
})

export const app = fastify()