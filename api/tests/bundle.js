// Package dependencies
const Mongoose = require('mongoose');
const Chai = require('chai');
const { expect } = require('chai');
const ChaiHttp = require('chai-http');

// Custom dependencies
const Server = require('../server');

// Models
const Product = Mongoose.model('Product');
const Bundle = Mongoose.model('Bundle');

// Chai
Chai.should();
Chai.use(ChaiHttp);

// Helper
const hasParamInValidationErrors = (array, param, msg) => {
  const error = array.find(element => element.param === param && element.msg === msg);
  return !!error;
};

// Global product
let productId;

/* eslint-disable no-unused-expressions */
describe('Endpoint -> Products', async () => {
  /**
   * Create global product
   */
  before(done => {
    const newProduct = new Product({ _externalId: 'Test ID', name: 'Test Product', price: 0 });
    newProduct.save((err, result) => {
      productId = result._id.toString();
      done();
    });
  });

  /**
   * Clear database product
   */
  after(done => {
    Product.deleteMany({}).then(() => done());
  });

  /**
   * Clear testing database
   */
  afterEach(done => {
    Bundle.deleteMany({}, () => {
      done();
    });
  });

  /**
   * Testing the /POST/ route
   */
  describe('/POST Bundles', () => {
    it('it should post a bundle', done => {
      const bundle = { name: 'Test Bundle', discountPercentage: 10, products: [productId] };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
        .end((err, res) => {
          res.should.have.a.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('discountPercentage');
          res.body.should.have.property('products');
          expect(res.body.products.length).to.be.equal(1);
          expect(res.body.products[0]).to.be.equal(productId);

          done();
        });
    });

    it('it should not post without request data', done => {
      Chai.request(Server)
        .post(`/v1/bundles/`)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not post a bundle without name', done => {
      const bundle = { discountPercentage: 10, products: [productId] };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
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

    it('it should not post a bundle with non-string name', done => {
      const bundle = { name: 0, discountPercentage: 10, products: [productId] };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
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

    it('it should not post a bundle without discountPercentage', done => {
      const bundle = { name: 'Test Bundle', products: [productId] };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'discountPercentage',
            'Discount percentage is required',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a bundle with non-number discountPercentage', done => {
      const bundle = { name: 'Test Bundle', discountPrice: 'test', products: [productId] };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'discountPercentage',
            'Discount percentage should be a number',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a bundle with discountPercentage < 0', done => {
      const bundle = { name: 'Test Bundle', discountPercentage: -1, products: [productId] };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'discountPercentage',
            'Discount percentage should be between 0 and 100 including',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a bundle with discountPercentage > 0', done => {
      const bundle = { name: 'Test Bundle', discountPercentage: 101, products: [productId] };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'discountPercentage',
            'Discount percentage should be between 0 and 100 including',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a bundle without products', done => {
      const bundle = { name: 'Test Bundle', discountPercentage: 10 };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'products',
            'Products is required',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a bundle with non-array products', done => {
      const bundle = { name: 'Test Bundle', discountPercentage: 10, products: 0 };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'products',
            'Products should be an array',
          );
          expect(exists).to.be.true;
          done();
        });
    });

    it('it should not post a bundle with empty array products', done => {
      const bundle = { name: 'Test Bundle', discountPercentage: 10, products: [] };
      Chai.request(Server)
        .post('/v1/bundles')
        .send(bundle)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('validationErrors');

          const exists = hasParamInValidationErrors(
            res.body.validationErrors,
            'products',
            'Products should have at least one product',
          );
          expect(exists).to.be.true;
          done();
        });
    });
  });

  it('it should not post a bundle with invalid product ids', done => {
    const bundle = { name: 'Test Bundle', discountPercentage: 10, products: [123] };
    Chai.request(Server)
      .post('/v1/bundles')
      .send(bundle)
      .end((err, res) => {
        res.should.have.a.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('validationErrors');

        const exists = hasParamInValidationErrors(
          res.body.validationErrors,
          'products',
          'Products should have valid IDs',
        );
        expect(exists).to.be.true;
        done();
      });
  });

  /**
   * Testing the /GET/ route
   */
  describe('/GET Bundles', () => {
    it('it should get all the bundles', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save(() => {
        Chai.request(Server)
          .get('/v1/bundles')
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
  describe('/GET/:id Bundles', () => {
    it('it should get a specific bundle by _id', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .get(`/v1/bundles/${bundle._id}`)
          .end((err, res) => {
            res.should.have.a.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('discountPercentage');
            res.body.should.have.property('products');
            expect(res.body.products.length).to.be.equal(1);
            expect(res.body.products[0]).to.be.equal(productId);

            done();
          });
      });
    });

    it('it should not get a non existing bundle _id', done => {
      Chai.request(Server)
        .get(`/v1/bundles/5c9ac9e181fef31f63c9d398`)
        .end((err, res) => {
          res.should.have.a.status(404);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not get an invalid mongodb _id', done => {
      Chai.request(Server)
        .get(`/v1/bundles/Test123`)
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
  describe('/PUT/:id Bundles', () => {
    it('it should update name and price of a bundle', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({
            name: 'Test Bundle 2',
            discountPercentage: 20,
            products: [productId, productId],
          })
          .end((err, res) => {
            res.should.have.a.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('discountPercentage');
            res.body.should.have.property('products');
            expect(res.body.name).to.be.equal('Test Bundle 2');
            expect(res.body.discountPercentage).to.be.equal(20);
            expect(res.body.products.length).to.be.equal(2);
            expect(res.body.products[0]).to.be.equal(productId);
            expect(res.body.products[1]).to.be.equal(productId);
            done();
          });
      });
    });

    it('it should not update a non existing bundle _id', done => {
      Chai.request(Server)
        .put(`/v1/bundles/5c9ac9e181fef31f63c9d398`)
        .send({
          name: 'Test Bundle',
          discountPercentage: 10,
          products: [productId],
        })
        .end((err, res) => {
          res.should.have.a.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not update an invalid mongodb _id', done => {
      Chai.request(Server)
        .put(`/v1/bundles/Test123`)
        .send({
          name: 'Test Bundle',
          discountPercentage: 10,
          products: [productId],
        })
        .end((err, res) => {
          res.should.have.a.status(500);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not update without request data', done => {
      Chai.request(Server)
        .put(`/v1/bundles/Test123`)
        .end((err, res) => {
          res.should.have.a.status(400);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not update a bundle without name', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ discountPercentage: 10, products: [productId] })
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

    it('it should not update a bundle with non-string name', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 0, discountPercentage: 10, products: [productId] })
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

    it('it should not update a bundle without discountPercentage', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 'Test Bundle', products: [productId] })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');
            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'discountPercentage',
              'Discount percentage is required',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not update a bundle with non-number discountPercentage', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 'Test Bundle', discountPercentage: 'Test', products: [productId] })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');
            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'discountPercentage',
              'Discount percentage should be a number',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not update a bundle with discountPercentage < 0', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 'Test Bundle', discountPercentage: -1, products: [productId] })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');
            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'discountPercentage',
              'Discount percentage should be between 0 and 100 including',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not update a bundle with discountPercentage > 100', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 'Test Bundle', discountPercentage: 101, products: [productId] })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');
            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'discountPercentage',
              'Discount percentage should be between 0 and 100 including',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not update a bundle without products', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 'Test Bundle' })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');
            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'products',
              'Products is required',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not update a bundle with non-array products', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 'Test Bundle', discountPercentage: 'Test', products: 'Test' })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');
            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'products',
              'Products should be an array',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not post a bundle with empty array products', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 'Test Bundle', discountPercentage: 101, products: [] })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');
            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'products',
              'Products should have at least one product',
            );
            expect(exists).to.be.true;
            done();
          });
      });
    });

    it('it should not post a bundle with invalid product ids', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .put(`/v1/bundles/${bundle._id}`)
          .send({ name: 'Test Bundle', discountPercentage: 101, products: [123] })
          .end((err, res) => {
            res.should.have.a.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('validationErrors');
            const exists = hasParamInValidationErrors(
              res.body.validationErrors,
              'products',
              'Products should have valid IDs',
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
  describe('/GET/:id Bundles', () => {
    it('it should delete a specific bundle by _id', done => {
      const newBundle = new Bundle({
        name: 'Test Bundle',
        discountPercentage: 10,
        products: [productId],
      });
      newBundle.save((error, bundle) => {
        Chai.request(Server)
          .delete(`/v1/bundles/${bundle._id}`)
          .end((err, res) => {
            res.should.have.a.status(200);
            res.body.should.be.a('object');

            done();
          });
      });
    });

    it('it should not delete a non existing bundle _id', done => {
      Chai.request(Server)
        .delete(`/v1/bundles/5c9ac9e181fef31f63c9d398`)
        .end((err, res) => {
          res.should.have.a.status(404);
          res.body.should.be.a('object');

          done();
        });
    });

    it('it should not delete an invalid mongodb _id', done => {
      Chai.request(Server)
        .delete(`/v1/bundles/Test123`)
        .end((err, res) => {
          res.should.have.a.status(500);
          res.body.should.be.a('object');

          done();
        });
    });
  });
});
