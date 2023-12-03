import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";

//vai funcionar como um plugin do festify
export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
}