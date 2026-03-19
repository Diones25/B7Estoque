import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { moves, NewMove, products } from "../db/schema";
import { AppError } from "../utils/apperror";


export const addMove = async (data: Omit<NewMove, 'unitPrice'>) => {
  // 1. Verificar se o produto existe e pegar o preço / quantity
  // 2. Se for OUT, verificar estoque
  // 3. Inserir a movimentação no banco
  // 4. Atualizar a quantidade do produto
  
  return await db.transaction(async (trx) => {
    const productResult = await trx
      .select({
        quantity: products.quantity,
        unitPrice: products.unitPrice
      })
      .from(products)
      .where(eq(products.id, data.productId))
      .for('update');

    if (productResult.length === 0) throw new AppError('Produto não encontrado');

    const currentQty = parseFloat(productResult[0].quantity);
    const moveQty = parseFloat(data.quantity);

    if (data.type === 'out') {
      if (currentQty < moveQty) {
        throw new AppError(`Quantidade insuficiente: Disponível ${currentQty}, solicitado ${moveQty}`, 400);
      }
    }

    const unitPrice = productResult[0].unitPrice;
    const result = await trx
      .insert(moves)
      .values({...data, unitPrice })
      .returning();
    
    const move = result[0];

    const newQty = data.type === 'in' ? currentQty + moveQty : currentQty - moveQty; 

    await trx
      .update(products)
      .set({ quantity: newQty.toString(), updatedAt: new Date() })
      .where(eq(products.id, data.productId));
  
    return move; 
  });

} 