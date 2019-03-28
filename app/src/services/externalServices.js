// Services
import { outsiderApi } from './api';

export default {
  /**
   * Returns the current geolocation settings.
   */
  getIpAPI: () => outsiderApi({ url: 'https://ipapi.co/json' }),

  /**
   * Returns the current exchange rates.
   */
  getExchangeRates: currency =>
    outsiderApi({ url: `https://api.exchangeratesapi.io/latest?base=${currency}` }),
};
