import Cookies from 'js-cookie';

// Services
import ExternalServices from '../services/externalServices';

export default {
  /**
   * Sets the currency by using IpAPI.
   */
  setCurrency: async () => {
    try {
      const geoLocation = await ExternalServices.getIpAPI();
      const currency = geoLocation.currency || 'USD';
      const language =
        geoLocation.languages.substring(0, geoLocation.languages.indexOf(',')) || 'en-US';
      Cookies.set('bas_currency', currency);
      Cookies.set('bas_language', language);

      const exchangeRates = await ExternalServices.getExchangeRates('USD');
      Cookies.set('bas_exchangeRates', exchangeRates);
    } catch (e) {
      Cookies.set('bas_currency', 'USD');
      Cookies.set('bas_language', 'en-US');
      Cookies.remove('bas_exchangeRates');
    }
  },

  /**
   * Returns the correct string currency for the given value.
   */
  get: value => {
    const currency = Cookies.get('bas_currency') || 'USD';
    const language = Cookies.get('bas_language') || 'en-US';
    const exchangeRates = Cookies.getJSON('bas_exchangeRates') || null;

    if (currency === 'USD') {
      return value.toLocaleString(language, { style: 'currency', currency });
    }

    if (!exchangeRates) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    return (value * exchangeRates.rates[currency]).toLocaleString(language, {
      style: 'currency',
      currency,
    });
  },
};
