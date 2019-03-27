// Package dependencies
const Chai = require('chai');
const { expect } = require('chai');
const ChaiHttp = require('chai-http');

// Custom dependencies
const Server = require('../server');

// Models
const Product = require('../models/product');

// Chai
Chai.should();
Chai.use(ChaiHttp);

const hasParamInValidationErrors = (array, param, msg) => {
  const error = array.find(element => element.param === param && element.msg === msg);
  return !!error;
};

/* eslint-disable no-unused-expressions */
describe('Endpoint -> Products', () => {
  /**
   * Clear testing database
   */
  afterEach(done => {
    Product.deleteMany({}, () => {
      done();
    });
  });

  /**
   * Testing the /POST/ route
   */
  describe('/POST Products', () => {
    it('it should post a product', done => {
      const product = { _externalId: 'Test ID', name: 'Test Product', price: 0 };
      Chai.request(Server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.a.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('_externalId');
          res.body.should.have.property('name');
          res.body.should.have.property('price');

          done();
        });
    });

    it('it should not post without request data', done => {
      Chai.request(Server)
        .post(`/v1/products/`)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not post with a repeated _externalId', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save(() => {
        Chai.request(Server)
          .post('/v1/products')
          .send({ _externalId: 'Test ID', name: 'Test Product', price: 0 })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');

            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              '_externalId',
              'External ID must be unique',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not post a product without _externalId', done => {
      const product = { name: 'Test Product', price: 0 };
      Chai.request(Server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            '_externalId',
            'External ID is required',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a product with non-string _externalId', done => {
      const product = { _externalId: 0, name: 'Test Product', price: 0 };
      Chai.request(Server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            '_externalId',
            'External ID should be a string',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a product without name', done => {
      const product = { _externalId: 'Test ID', price: 0 };
      Chai.request(Server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'name',
            'Name is required',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a product with non-string name', done => {
      const product = { _externalId: 'Test ID', name: 0, price: 0 };
      Chai.request(Server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'name',
            'Name should be a string',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a product without price', done => {
      const product = { _externalId: 'Test ID', name: 'Test Product' };
      Chai.request(Server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'price',
            'Price is required',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a product with non-number price', done => {
      const product = { _externalId: 'Test ID', name: 'Test Product', price: 'test' };
      Chai.request(Server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'price',
            'Price should be a number',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a product with price < 0', done => {
      const product = { _externalId: 'Test ID', name: 'Test Product', price: -1 };
      Chai.request(Server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'price',
            'Price should be 0 or above',
          );
          expect(exists).to.be.true;
          done();
        });
    });
  });

  /**
   * Testing the /GET/ route
   */
  describe('/GET Products', () => {
    it('it should get all the products', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save(() => {
        Chai.request(Server)
          .get('/v1/products')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.above(0);

            done();
          });
      });
    });
  });

  /**
   * Testing the /GET/:id route
   */
  describe('/GET/:id Products', () => {
    it('it should get a specific product by _id', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .get(`/v1/products/${product._id}`)
          .end((err, res) => {
            res.should.have.a.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_externalId');
            res.body.should.have.property('name');
            res.body.should.have.property('price');

            done();
          });
      });
    });

    it('it should not get a non existing product _id', done => {
      Chai.request(Server)
        .get(`/v1/products/5c9ac9e181fef31f63c9d398`)
        .end((err, res) => {
          res.should.have.a.status(404);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not get an invalid mongodb _id', done => {
      Chai.request(Server)
        .get(`/v1/products/Test123`)
        .end((err, res) => {
          res.should.have.a.status(500);
          res.body.should.be.a('object');

          done();
        });
    });
  });

  /**
   * Testing the /PUT/:id route
   */
  describe('/PUT/:id Products', () => {
    it('it should update name and price of a product', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .put(`/v1/products/${product._id}`)
          .send({ name: 'Test Product 2', price: 1 })
          .end((err, res) => {
            res.should.have.a.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('price');

            expect(res.body.name).to.be.equal('Test Product 2');
            expect(res.body.price).to.be.equal(1);
            done();
          });
      });
    });

    it('it should not update _externalId of a product', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .put(`/v1/products/${product._id}`)
          .send({ _externalId: 'Test ID 2', name: 'Test Product 2', price: 1 })
          .end((err, res) => {
            res.should.have.a.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_externalId');

            expect(res.body._externalId).to.be.equal('Test ID');
            done();
          });
      });
    });

    it('it should not update a non existing product _id', done => {
      Chai.request(Server)
        .put(`/v1/products/5c9ac9e181fef31f63c9d398`)
        .send({ _externalId: 'Test ID 2', name: 'Test Product 2', price: 1 })
        .end((err, res) => {
          res.should.have.a.status(404);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not update an invalid mongodb _id', done => {
      Chai.request(Server)
        .put(`/v1/products/Test123`)
        .send({ _externalId: 'Test ID 2', name: 'Test Product 2', price: 1 })
        .end((err, res) => {
          res.should.have.a.status(500);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not update without request data', done => {
      Chai.request(Server)
        .put(`/v1/products/Test123`)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not post a product without name', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .put(`/v1/products/${product._id}`)
          .send({ price: 1 })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');

            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'name',
              'Name is required',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not post a product with non-string name', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .put(`/v1/products/${product._id}`)
          .send({ name: 0, price: 1 })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');

            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'name',
              'Name should be a string',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not post a product without price', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .put(`/v1/products/${product._id}`)
          .send({ name: 0 })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');

            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'price',
              'Price is required',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not post a product with non-number price', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .put(`/v1/products/${product._id}`)
          .send({ name: 0, price: 'test' })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');

            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'price',
              'Price should be a number',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not post a product with price < 0', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .put(`/v1/products/${product._id}`)
          .send({ name: 0, price: -1 })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');

            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'price',
              'Price should be 0 or above',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });
  });

  /**
   * Testing the /DELETE/:id route
   */
  describe('/GET/:id Products', () => {
    it('it should delete a specific product by _id', done => {
      const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
      newProduct.save((error, product) => {
        Chai.request(Server)
          .delete(`/v1/products/${product._id}`)
          .end((err, res) => {
            res.should.have.a.status(200);
            res.body.should.be.a('object');

            done();
          });
      });
    });

    it('it should not delete a non existing product _id', done => {
      Chai.request(Server)
        .delete(`/v1/products/5c9ac9e181fef31f63c9d398`)
        .end((err, res) => {
          res.should.have.a.status(404);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not delete an invalid mongodb _id', done => {
      Chai.request(Server)
        .delete(`/v1/products/Test123`)
        .end((err, res) => {
          res.should.have.a.status(500);
          res.body.should.be.a('object');

          done();
        });
    });
  });
});
