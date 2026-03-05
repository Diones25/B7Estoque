import z from "zod";


export const AuthLoginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres")
});