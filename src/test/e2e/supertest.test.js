const chai = require('chai');
const superTest = require('supertest');
const testingURL = 'http://localhost:8080';
const request = superTest(testingURL);
const expect = chai.expect;
const testingProducts = ['63e7a0bc5e00080596fcc2b8', '646aa8027a2a848d97cc6958'];

// describe('Test de productos', () => {
//   const product = {
//     title: 'Testing product',
//     description: 'Descripcion de prueba para testing',
//     code: 'PRTS1',
//     price: 50000,
//     stock: 200,
//     category: 'testing',
//     thumbnails: ['...links'],
//   };

//   it(`Testing de obtencion de todos los productos - ${testingURL}/api/products`, async () => {
//     const { statusCode, ok, _body } = await request.get(`/api/productsBd`);
//     expect(statusCode).to.deep.equal(200);
//     expect(ok).to.be.true;
//     expect(_body.payload).to.be.an.instanceof(Array);
//   });

//   it(`Testing de obtencion de un producto por ID - ${testingURL}/api/products/:pid`, async () => {
//     const { statusCode, ok, _body } = await request.get(`/api/productsBd/${testingProducts[0]}`);
//     expect(statusCode).to.deep.equal(200);
//     expect(ok).to.be.true;
//     expect(_body).to.be.an.instanceof(Object);
//   });

//   it(`Testing de creacion de un producto - ${testingURL}/api/products/`, async () => {
//     const { statusCode, ok, _body } = await request.post(`/api/products/`).send(product);
//     expect(statusCode).to.deep.equal(200);
//     expect(ok).to.be.true;
//     expect(_body).to.be.an.instanceof(Object);
//   });
// });

// Testing de carrito

describe('Test de carritos', () => {
  let Id;
  it(`Testing de obtencion de carritos `, async () => {
    const { statusCode, ok, _body } = await request.get('/api/cartsBd');
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Array);
  });

  it(`Testing de obtencion de carrito por ID `, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/cartsBd/${Id}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });

  it(`Testing de adicion de producto a un carrito por ID `, async () => {
    const { statusCode, ok, _body } = await request.post(`/api/cartsBd/${Id}/products/${testingProducts[0]}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Array);
  });
});

// Testing de Session
describe('Test de sesiones', () => {
  const user = {
    firstName: 'pepe',
    lastName: 'gomez',
    email: 'testing@email.com',
    password: '123456',
  };
  let cookie;

  it(`Testing de registro`, async () => {
    const response = await request.post(`/api/session/register`).send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    const { statusCode, _body, ok } = response;
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body);
  });

  it(`Testing de inicio de sesion`, async () => {
    const response = await request.post(`/api/session/login`).send({
      email: user.email,
      password: user.password,
    });
    const { statusCode, _body, headers } = response;
    const array = headers['set-cookie'][0].split('=');
    cookie = {
      name: array[0],
      value: array[1],
    };
    expect(statusCode).to.deep.equal(200);
    expect(headers['set-cookie']).to.be.ok;
    expect(_body.firstName).to.equal(user.firstName);
    expect(_body.lastName).to.equal(user.lastName);
    expect(cookie.name).to.equal('connect.sid');
    expect(cookie.value).to.equal;
  });

  it(`Current Usuario`, async () => {
    const response = await request.get(`/api/session/current`).set('Cookie', `${cookie.firstName}=${cookie.value}`);
    const { statusCode, _body, headers } = response;
    expect(statusCode).to.deep.equal(200);

    expect(_body.firstName).to.equal(user.firstName);

    expect(_body.lastName).to.equal(user.lastName);
  });
});
