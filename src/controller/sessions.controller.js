const userModel = require('../dao/models/users.model');
const { hashpassword, comparePassword } = require('../utils/hashpassword');

//cokies
const registerForm = async (req, res) => {
  const hash = await hashpassword(req.body.password);
  try {
    const { firstName, lastName, email, password } = { ...req.body, password: hash };
    if (!firstName || !lastName || !email || !password) return res.status(400).send({ status: 400, error: 'Valores incompletos' });
    const exist = await userModel.findOne({ email });
    if (exist) return res.status(400).send({ status: 400, error: 'El correo ya esta registrado' });
    const result = await userModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.send({ status: 'success', payload: result });
  } catch (error) {
    return res.send({ status: 500, error: 'Error de registro' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValidPassword = await comparePassword(password, user.password);
    if (email == 'adminCoder@coder.com' && password == 'adminCod3r123' && isValidPassword) {
      req.session.user = {
        id: 'adminCoder',
        firstName: 'Coder',
        lastName: 'Admin',
        email: email,
        role: 'admin',
      };
      return res.status(201).json({
        status: 'success',
        message: 'Has iniciado sesion satisfactoriamente',
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
    if (!email || !password) return res.status(400).send({ status: 400, error: 'Valores incompletos' });
    const user = await userModel.findOne({ email, password });
    if (!user) return res.status(400).send({ status: 400, error: 'Correo o contraseña invalidos' });

    req.session.user = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: 'user',
    };

    return res.status(201).json({
      status: 'success',
      message: 'Has iniciado sesion satisfactoriamente',
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res.send({ status: 500, error: 'Error de login' });
  }
};

const sessionLogin = async (req, res) => {
  res.send(req.user);
};

const loginRegister = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  registerForm,
  login,
  sessionLogin,
  loginRegister,
};
