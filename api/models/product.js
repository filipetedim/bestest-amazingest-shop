// Package dependencies
const mongoose = require('mongoose');

// Schema
const ProductSchema = mongoose.Schema({
  _externalId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

ProductSchema.methods.toJSON = function() {
  return {
    ...this.toObject(),
    created_at: this._id.getTimestamp(),
  };
};

ProductSchema.statics.findByExternalId = function(_externalId) {
  return this.findOne({ _externalId }, (err, product) => product);
};

ProductSchema.virtual('created_at').get(() => this._id.getTimestamp());

// Model
module.exports = mongoose.model('Product', ProductSchema);
