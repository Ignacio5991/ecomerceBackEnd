const productModel = require('../dao/models/products.model');

const addProductsId = (id) => productModel.find(id);

module.exports = {
  addProductsId,
};
