import { extendObservable } from 'mobx';
import Cookies from 'js-cookie';

class CartStore {
  constructor() {
    extendObservable(this, {
      cart: Cookies.getJSON('cart') || [],
    });
  }

  /**
   * Adds a new product to the cart.
   */
  addProduct = product => {
    this.cart.push(product);
    Cookies.set('cart', this.cart);
  };

  /**
   * Reversely removes the first instance of a product from the cart.
   * Because the cart container will ignore repeated products and include a (1x) behind,
   * it's OK to just remove the first instance when reversed.
   * We reverse it so the order of the products doesn't change.
   */
  removeProduct = product => {
    for (let i = this.cart.length - 1; i > -1; i--) {
      if (this.cart[i]._id.toString() === product._id.toString()) {
        this.cart.splice(i, 1);
        Cookies.set('cart', this.cart);
        break;
      }
    }
  };

  /**
   * Clears the cart.
   */
  clearCart = () => {
    this.cart = [];
    Cookies.set('cart', []);
  };
}

export default new CartStore();
