// Services
import { api } from './api';

export default {
  /**
   * Gets all the products.
   */
  getProducts: () => api({ endpoint: 'products' }),
};
