const productModel = require('../dao/models/products.model');

const deleteProducts = (id) => productModel.find(id);

module.exports = {
  deleteProducts,
};
