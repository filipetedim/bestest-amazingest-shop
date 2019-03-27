// Package dependencies
const mongoose = require('mongoose');

// Schema
const BundleSchema = mongoose.Schema({
  name: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  products: [String],
});

BundleSchema.methods.toJSON = function() {
  return {
    ...this.toObject(),
    created_at: this._id.getTimestamp(),
  };
};

BundleSchema.virtual('created_at').get(() => this._id.getTimestamp());

// Model
module.exports = mongoose.model('Bundle', BundleSchema);
