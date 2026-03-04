import z from "zod";


export const createUserSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório").max(255),
  email: z.email('Formato de e-mail inválido'),
  password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres")
});