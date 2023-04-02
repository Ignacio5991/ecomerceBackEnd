const productModel = require('../dao/models/products.model');

const getProducts = (page, limit, sort, query) => productModel.find(page, limit, sort, query);

module.exports = {
  getProducts,
};
