const mongoose = require('mongoose');
const BdProductManager = require('../../../src/dao/mongoManager/BdProductManager');
const Assert = require('assert');
const { invalidParamsProduct } = require('../../../src/utils/creatorMsg');
const { expect } = require('chai');

mongoose.connect('mongodb+srv://Ignacio:jY6DHRTn6F9uCAmF@admin.mtszt8r.mongodb.net/?retryWrites=true&w=majority');

describe('Testint all function of BdProductManager', () => {
  before(() => {});

  beforeEach(() => {
    // this.timeout(10000);
  });

  it('test get product limit default is equal 6', async () => {
    const result = await BdProductManager.getProduct();
    Assert.strictEqual(result.docs.length, 6);
  });

  it('test get product limit default is equal 6 - CHAI', async () => {
    const result = await BdProductManager.getProduct();

    expect(result.docs.length).to.equal(6);
  });

  it('test get product return array', async () => {
    const result = await BdProductManager.getProduct();
    Assert.strictEqual(Array.isArray(result.docs), true);
  });

  it('test get product return array - CHAI', async () => {
    const result = await BdProductManager.getProduct();
    expect(result.docs).to.be.an('array').and.to.have.lengthOf(6);
  });

  it('test add product', async () => {
    const product = {
      title: 'test-title',
      description: 'test-description',
      code: 'test-code',
      price: 1000,
      category: 'test-category',
    };

    const result = await BdProductManager.addProduct(product);
    console.log(result.newproduct._id);
    Assert.ok(result.newproduct._id);
    Assert.strictEqual(result.newproduct.owner, 'admin');
  });

  it('test add product - CHAI', async () => {
    const product = {
      title: 'test-title',
      description: 'test-description',
      code: 'test-code',
      price: 1000,
      category: 'test-category',
    };

    const result = await BdProductManager.addProduct(product);

    expect(result.newproduct._id).not.to.be.null;
    expect(result.newproduct.owner).to.equal('admin');
  });

  it('test get product by id', async () => {
    const id = '646c09882a559c1cdc01deff';

    const result = await BdProductManager.getProductId(id);
    Assert.ok(result.title);
    Assert.strictEqual(result.title, 'test-title');
  });

  it('test get product by id - CHAI', async () => {
    const id = '646c09882a559c1cdc01deff';

    const result = await BdProductManager.getProductId(id);
    expect(result.title).to.equal('test-title');
  });

  // it("test create msg " ,()=>{
  //     const resutl = invalidParamsProduct({})
  //     Assert.equal(resutl,`Error ocurrio porque faltan los siguientes campos obligatorios. Los parametros obligatorios son:
  //     * Title: el titulo es un campo requerido y el ingresado es: undefined
  //     * Description: el titulo es un campo requerido y el ingresado es: undefined
  //     * Code: el titulo es un campo requerido y el ingresado es: undefined
  //     * Price: el titulo es un campo requerido y el ingresado es: undefined
  //     * Category: el titulo es un campo requerido y el ingresado es: undefined
  //     `)
  // })
});
