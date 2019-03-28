// Services
import { api } from './api';

export default {
  /**
   * Gets all the bundles.
   */
  getBundles: () => api({ endpoint: 'bundles' }),

  /**
   * Get all the bundles that have the product id.
   */
  getBundlesWithProduct: productId => api({ endpoint: `bundles/product/${productId}` }),
};
