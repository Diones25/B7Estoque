import z from "zod";

const unitTypeEnum = z.enum(['kg', 'g', 'l', 'ml', 'un']);

export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  categoryId: z.uuid('Formato de ID de categoria inválido'),
  unitPrice: z.number().int().min(0, 'Preço unitário deve ser um número positivo'),
  unitType: unitTypeEnum,
  quantity: z.coerce.number().min(0, 'Quantidade deve ser um número positivo').default(0).transform(String),
  minimumQuantity: z.coerce.number().min(0, 'Quantidade mínima deve ser um número positivo').default(0).transform(String),
  maximumQuantity: z.coerce.number().min(0, 'Quantidade maxima deve ser um número positivo').default(0).transform(String)
}).refine((data) => parseFloat(data.maximumQuantity) >= parseFloat(data.minimumQuantity), {
  message: 'Quantidade máxima deve ser maior ou igual à quantidade mínima',
  path: ['maximumQuantity']
});

export const listProductsSchema = z.object({
  name: z.string().min(2, 'Nome do produto é pequeno').optional(),
  offset: z.coerce.number().int().min(0).optional().default(0),
  limit: z.coerce.number().int().min(1).optional().default(10)
});