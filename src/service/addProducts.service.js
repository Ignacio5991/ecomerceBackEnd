const productModel = require('../dao/models/products.model');

const addProductsbd = (product) => productModel.find(product);

module.exports = {
  addProductsbd,
};
