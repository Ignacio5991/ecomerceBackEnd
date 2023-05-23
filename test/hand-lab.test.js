const UserDTO = require("../src/dao/DTOs/user.dto");
const { hashpassword, comparePassword } = require("../src/utils/hashpassword")
const { expect } = require('chai');



describe('testing realizado en clasee hand labd', () => { 

    const password = "123456";
    const hash = '$2b$12$vhJGKZJM8o8bYa4zGcdP0Oi78xGP.MbKH85JSPxxHLMmRedAhM2T.'


    it('test revision del hash de contraseña',()=>{
        const hash = hashpassword(password)
        expect(hash).not.to.equal(password);
    })

    it('test revision del hash de contraseña',async ()=>{
        const isValid =await  comparePassword(password,hash)
        expect(isValid).to.equal(true);
    })


    //test DTO

    it('test validar que se eliminen propiedades innecesarias',()=>{
        const user = {
            firstName:"test",
            lastName:"test",
            role:"test",
            password:"test",
            email:"test",
        }

        const response = new UserDTO(user);
        expect(response).to.deep.equal({
            firstName:"test",
            lastName:"test",
            role:"test",
        })
        expect(response).not.to.have.property("password")
        expect(response).not.to.have.property("email")

        // expect(response).to.have.property("firstName").and.not.to.have.property("password").not.to.have.property("email");;

    })



 })