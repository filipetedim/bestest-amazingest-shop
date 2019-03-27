// Services
import { api } from './api';

export default {
  /**
   * Gets all the bundles.
   */
  getBundles: () => api({ endpoint: 'bundles' }),
};
