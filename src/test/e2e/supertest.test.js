const chai = require('chai');
const superTest = require('supertest');

const request = superTest('http://localhost:8080/');
const expect = chai.expect;

describe('Test de productos', () => {
  const mockProduct = {
    title: 'Testing product',
    description: 'Descripcion de prueba para testing',
    code: 'PRTS1',
    price: 50000,
    stock: 200,
    category: 'testing',
    thumbnails: ['...links'],
  };
  let mockProductId;

  it(`Testing de obtencion de todos los productos - ${testingURL}/api/products`, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/productsBd`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body.payload).to.be.an.instanceof(Array);
  });

  it(`Testing de obtencion de un producto por ID - ${testingURL}/api/products/:pid`, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/productsBd/${testingProducts[0]}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body.payload).to.be.an.instanceof(Object);
  });

  it(`Testing de creacion de un producto - ${testingURL}/api/products/`, async () => {
    const { statusCode, ok, _body } = await request.post(`/api/productsBd/`).send(mockProduct);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body.payload).to.be.an.instanceof(Object);
    mockProductId = _body.payload._id;
  });
});
