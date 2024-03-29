const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const { stringify } = require('querystring');
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: Boolean,
  stock: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnail: String,
  owner: {
    type: String,
    default: 'admin',
  },
  ownerRole: {
    type: String,
  },
});
productSchema.plugin(paginate);
const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
