// Services
import { api } from './api';

export default {
  /**
   * Returns all the bundles.
   */
  getBundles: () => api({ endpoint: 'bundles' }),

  /**
   * Returns all the bundles that have the product id.
   */
  getBundlesWithProduct: productId => api({ endpoint: `bundles/product/${productId}` }),
};
