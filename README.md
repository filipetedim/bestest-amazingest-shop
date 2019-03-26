# Bestest Amazingest Shop

A prototype of the more bestest and most amazingest item shop in the whole universe.

Thanos bought his glove here.

## Frontend requirements

### Required

* Main page to list products
  * Components:
    * Search: Filter automatically, add search query browser link for share/re-open
    * Cart: Show price, + discounted price -> link to cart page
    * Discounts: Names, Discount %, Old price strike-through, Price, Add to cart
    * Item List: Name, Price, Add to cart -> link to product page
* Product page with details
  * Components:
    * Cart: Same
    * Item details: Add to cart

### Bonus

* Main page
  * Components:
    * Search: Filter automatically, add search query browser link for share/re-open
    * Discounts: Images, Local currency
    * Cart: Local currency
    * Item List: Image, Local currency
* Product page:
  * Components:
    * Cart: Local currency
    * Item details: Image, Local currency
    * Discounts: Show discount bundle if item has one

## Backend requirements

### Routes

* /products
* /products/{id}
* /bundles
* /bundles/{id}
* /cart
