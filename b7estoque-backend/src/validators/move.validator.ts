import z from "zod";

const moveTypeEnum = z.enum(['in', 'out']);

export const createMoveSchema = z.object({
  productId: z.uuid('Formato de ID de produto inválido'),
  type: moveTypeEnum,
  quantity: z.coerce.number().positive('A quantidade deve ser um número positivo').transform(String),
});