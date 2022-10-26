import { Router } from 'express';
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../services/product.service.js';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProductById);

export default productRouter;
