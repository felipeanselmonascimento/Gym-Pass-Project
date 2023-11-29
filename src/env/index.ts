import 'dotenv/config' //variaveis foram carregados do .env
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333) //coerce pega o dado e converte para o dado logo apos ele
})

const _env = envSchema.safeParse(process.env)

if ( _env.success === false) {
    console.error('Invalid Environmetn variables', _env.error.format())
    
    throw new Error('Invalid Environment variables')
}

export const env = _env.data