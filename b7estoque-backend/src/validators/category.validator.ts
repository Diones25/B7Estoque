import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255)
});

export const listCategoriesSchema = z.object({
  includeProductsCount: z.boolean().optional().default(false)
});