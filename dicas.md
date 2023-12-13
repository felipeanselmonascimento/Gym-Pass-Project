// npm init -y 

//npm i typescript @types/node tsx tsup -D

//npx tsc --init --- criar o config do ts, dentro do arquivo trocar o target pra 2020

//npm i fastify

feito app.ts e server.ts

criado pasta gitignore
c
onfigurar script dev, e de build e start(usado para producao)

configurar o npm criando o npmrc, constatemente atualizar as dependencias, o bot tenta atualizar automaticamente, ele cria uma pull request falnado q precisa ser atualizado

//variaveis ambiente
//npm i dotenv
//npm i zod

// no tsconfig procurar por baseUrl and paths

instalar o prisma
npx prisma init
baixado a extension prisma

1 @ no model e a nivel de coluna
2 @ e a nivel de tabela

model User {
  id String @id //toda tabela precisa ter um @id que e a chave primaria//

  @@map("users")
}

npx prisma generate
instalar o npm i @prisma/client dependencia de producao
importar de dentro do app.ts > import { PrismaClient } from "@prisma/client";
PrismaClient instanciar o obj pra fazer a conexao com o banco de dados

$ docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker  -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
alguns comando do docker
docker ps retorna os container q ta rodando
docker rm api-solid-pg
docker ps -a todos os container q ja criei em algum momento
docker start api-solid-pg

colouqei manualmente a variavel ambiente, DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
npx prisma migrate dev
npx prisma studio

docker compose dita quais os container a aplicacao precisa criar pra q ela funcione
docker compose up -d
docker compose down --- deleta o container
docker compose stop

criado a pasta lib/prisma.ts para fazer a conexao com o banco de dados
criado primeira rota de users 
colocado parametro na conexao para mostrar a query em dev 
export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
})


//MVC [model, view, controller]
criado pasta http para colocar os controller e criacao do arquivo routes.ts

npm i bcryptjs biblioteca mais comum do node para fazer hash em senhas
npm i @types/bcryptjs -D

criado password_hash e colocamos um erro se email for igual

criado a pasta use-cases praticamente para a rota n criar o usuario, fizemos a Interface

criar os patterns, primeiro pattern criado vai ser o repository pattern
criar pasta repositories
o primeiro arquivo foi prisma-(nome da entidade q to criando)
qualquer coisa q for ser feito no banco vai ser interceptado pelo repositorio

principios SOLID
D - dependecy inversion principle

meu caso de uso nao pode depender do repositorio
meu usoCase vai receber o repositorio por parametro maioria em POO, no caso dentro do constructor

criado a pasta users-repository.ts
usado para criar a tipagem da interface do prisma(olhar pasta)

criado a pasta errors, tratado o erro do controller
criar um error handler na nossa aplicacao, criado em app.ts, o proprio fastify ta fazendo a tratativa de erro

instalar vitest
npm i vitest vite-tsconfig-paths -D
criar arquivo vite.config.ts
criado script para testes
"test": "vitest run" --- roda todos os testes
"test:watch": "vitest" --- roda e olha
criado pasta register.spec.ts nos use-case
testes unitarios nunca vai tocar em banco de dados e external da aplicacao

criado a pasta de repositories em memory
e feito os testes da primeira etapa

criado um script test coverage, coverage dando conflito com dependencia (TO DO), usei o force

criado arquivo authenticate.ts, error authenticate

criado pasta authenticates.spec.ts, e tbm o authenticate controller

refatorado os test para as intancias

factory pattern usado quando o codigo possui varias dependencias
criando factory para os casos de uso 
criada pasta chamada factory

criado caso de uso get-user-profile
nao focar tanto em http no momento focar mais em use-case e test

criado caso de uso de check in

metodologia de desenvolvimento chamada TDD - test driven development & mocking
primeira etapa do TDD // red q significa erro no teste,
proximo estado é o estado greeen
proximo estado é o refactory

npm i dayjs

criado Gymrepository

criado a pasta utils para calcular a distancia de dois pontos

criado pasta fetch-members em useCase
fetch é mais de uma informacao, get apenas uma informacao









