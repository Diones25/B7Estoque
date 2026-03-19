import z from "zod";

const moveTypeEnum = z.enum(['in', 'out']);

export const createMoveSchema = z.object({
  productId: z.uuid('Formato de ID de produto inválido'),
  type: moveTypeEnum,
  quantity: z.coerce.number().positive('A quantidade deve ser um número positivo').transform(String),
});

export const listMovesSchema = z.object({
  productId: z.uuid('Formato de ID de produto inválido').optional(),
  offset: z.coerce.number().int().min(0).optional().default(0),
  limit: z.coerce.number().int().min(1).optional().default(10)
});

export type ListMovesInput = z.infer<typeof listMovesSchema>;