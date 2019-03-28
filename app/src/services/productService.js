// Services
import { api } from './api';

export default {
  /**
   * Returns all the products.
   */
  getProducts: () => api({ endpoint: 'products' }),

  /**
   * Returns a specific product.
   */
  getProduct: productId => api({ endpoint: `products/${productId}` }),
};
