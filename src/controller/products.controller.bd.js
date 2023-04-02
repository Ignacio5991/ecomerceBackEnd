const { addProductsbd } = require('../service/addProducts.service');
const { deleteProducts } = require('../service/deleteProducts.service');
const { addProductsId } = require('../service/getProductid.service');
const { getProducts } = require('../service/getProducts.service');
const { updateProducts } = require('../service/updateProducts.service');

const getProductsBd = async (req, res) => {
  const { limit, page, sort, ...query } = req.query;
  const products = await getProducts(page, limit, sort, query);
  const { docs } = products;
  const state = products ? 'success' : 'error';
  if (products) {
    res.json({ ...products, status: state, payload: docs });
  } else {
    res.json(products);
  }
};
const addProductBd = async (req, res) => {
  const product = req.body;
  const newproduct = await addProductsbd(product);
  if (newproduct) {
    res.json(newproduct);
  } else {
    res.json(newproduct);
  }
};

const getProductIdBd = async (req, res) => {
  const id = req.params.pid;
  const getProductId = await addProductsId(id);
  if (getProductId) {
    res.json(getProductId);
  } else {
    res.json(getProductId);
  }
};

const UpdateProductBd = async (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  const UpdateProductId = await updateProducts(id, product);
  if (UpdateProductId) {
    res.json(UpdateProductId);
  } else {
    res.json(UpdateProductId);
  }
};

const deleteProductBd = async (req, res) => {
  const id = req.params.pid;
  const deleteproduct = await deleteProducts(id);
  if (deleteproduct) {
    res.json(deleteproduct);
  } else {
    res.json(deleteproduct);
  }
};

module.exports = {
  getProductsBd,
  getProductIdBd,
  addProductBd,
  UpdateProductBd,
  deleteProductBd,
};
