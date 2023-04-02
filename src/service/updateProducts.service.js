const productModel = require('../dao/models/products.model');

const updateProducts = (id, product) => productModel.find(id, product);

module.exports = {
  updateProducts,
};
