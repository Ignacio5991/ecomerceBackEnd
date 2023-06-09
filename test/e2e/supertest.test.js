const chai = require('chai');
const superTest = require('supertest');

const request = superTest('http://localhost:8080')
const expect = chai.expect;



describe('Test end to end, añadir producto', () => { 
    // const product = {
    //     title: 'test-title',
    //     description: 'test-description',
    //     code: 'test-code',
    //     price: 1000,
    //     category: 'test-category',
    //   };
    // it('Añadir producto a la bd', async () => {
    //     const response = await request.post('/api/productsBd/').send({
    //         ...product
    //     })

    //     const { statusCode, _body, ok } = response;

    //     // console.log({ statusCode, _body, ok } )
    //     expect(statusCode).to.equal(200)
    //     expect(_body.msg).to.equal('Producto Creado')
    //     expect(ok).to.be.ok
    //     expect(_body.newproduct._id).to.be.ok
    // })

    // it('obtener producto a la bd', async () => {
    //     const response = await request.get('/api/productsBd/').send()
        
    //     const { statusCode, _body, ok } = response;

    //     // console.log({ statusCode, _body, ok } )
    //     expect(statusCode).to.equal(200)
    //     expect(_body.payload).to.be.an('array')
    //     expect(Array.isArray(_body.payload)).to.be.ok
    //     expect(_body.payload.length).to.equal(_body.limit)
    //     // expect(_body.docs).to.deep.equal(_body.payload)
    // })



    // const user = {
    //     firstName:"pepe",
    //     lastName:"pepe",
    //     email:"test@gmail.com",
    //     password:"123",
    // }
    // supert test registo 
    // it('Registrar usuario', async () => {

    //     const response = await request.post('/api/session/register').send(user);
    //     const { statusCode, _body } = response;


    //     expect(statusCode).to.equal(200)


    // })

   
    it('Registrar pet con imagen', async () => {

            const response = await request.post('/api/pets/withimage')
            .field("name","test")
            .field("specie","test")
            .field("birthDate","12-30-2000")
            .attach("image","/Users/kjjacquec/Desktop/coder/ecomerceBackEnd/test/mascota.jpeg");
            const { statusCode, _body } = response;
        




            expect(_body.payload.image).to.be.ok
            expect(_body.status).to.equal('success')
    
            expect(statusCode).to.equal(200)
    
    
        })

        it('add product image', async () => {

            const response = await request.post('/api/pets/withimage')
            .field("name","test")
            .field("specie","test")
            .field("birthDate","12-30-2000")
            .attach("image","/Users/kjjacquec/Desktop/coder/ecomerceBackEnd/test/mascota.jpeg");
            const { statusCode, _body } = response;
        




            expect(_body.msg).to.equal('success')
            expect(_body.data._id).to.be.ok
            expect(statusCode).to.equal(200)
    
    
        })





})