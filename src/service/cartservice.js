const cartsModel = require('../dao/models/carts.model');

const createCart = (cart) => cartsModel.find(cart);

const getCart = () => cartsModel.find();

const getCartId = (id) => cartsModel.findById(id);

const addProductsToCart = (pid, cid) => cartsModel.findById(pid, cid);

const deleteProductsToCart = (cid, pid) => cartsModel.findById(cid, pid);

const updateQuantitysProduct = (cid, pid) => cartsModel.find(cid, pid);

const cartUpdates = (cid) => cartsModel.find(cid);

const deleteToCarts = (cid) => cartsModel.find(cid);

module.exports = {
  createCart,
  getCart,
  getCartId,
  addProductsToCart,
  deleteProductsToCart,
  updateQuantitysProduct,
  cartUpdates,
  deleteToCarts,
};
