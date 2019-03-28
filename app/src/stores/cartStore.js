import { extendObservable } from 'mobx';
import Cookies from 'js-cookie';

class CartStore {
  constructor() {
    extendObservable(this, {
      cart: Cookies.getJSON('bas_cart') || [],
    });
  }

  /**
   * Adds a new product to the cart.
   */
  addProduct = product => {
    this.cart.push(product);
    Cookies.set('bas_cart', this.cart);
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
        Cookies.set('bas_cart', this.cart);
        break;
      }
    }
  };

  /**
   * Clears the cart.
   */
  clearCart = () => {
    this.cart = [];
    Cookies.set('bas_cart', []);
  };

  /**
   * Returns a product by its ID.
   */
  getProductById = productId =>
    this.cart.filter(item => item._id.toString() === productId.toString())[0];

  /**
   * Returns the total price in the cart.
   */
  getTotalPrice = () => this.cart.reduce((totalPrice, product) => totalPrice + product.price, 0);

  /**
   * Returns the grouped cart by product and quantity.
   */
  getGroupedCart = () =>
    this.cart.reduce((cart, product) => {
      const exists = cart.filter(cartItem => cartItem._id.toString() === product._id.toString())[0];

      if (exists) {
        exists.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      return cart;
    }, []);
}

export default new CartStore();
