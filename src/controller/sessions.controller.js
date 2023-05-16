//cokies

const DTOsUser = require('../dao/DTOs/user.dto');
const userModel = require('../dao/models/users.model');
const BdSessionManager = require('../dao/mongoManager/BdSessionManager');
const mailingService = require('../service/mailing.service');
const { getUser } = require('../service/users.service');
const { generateToken, getPayload } = require('../utils/jwt');

const sessionLogin = async (req, res) => {
  res.send(req.user);
};

const loginRegister = async (req, res) => {
  const dtoUser = DTOsUser(req.user);
  req.session.user = dtoUser;
  res.send(dtoUser);
};

const current = async (req, res) => {
  res.send(req.user);
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      req.cookies;
      let token = generateToken({ email: user.email });
      mailingService.sendMail({
        to: user.email,
        subject: `Hola${user.firstName}`,
        html: `<a href="http://localhost:8080/forgotpassword/${token}">aqui</a>`,
      });
    }
    res
      .cookies('token', true, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
      })
      .send('Se envio un correo de recuperacion a tu casilla de correo');
  } catch {
    res.status(404).send('Email inexistente');
  }
};
//   try {
//     let { email } = req.body;
//     const user = await BdSessionManager.getEmail({ email: email });
//     if (user === null) {
//       return res.status(404).json({ message: 'Mail no valido' });
//     }
//     let token = generateToken({ email: user.email });
//     mailingService.sendMail({
//       to: user.email,
//       subject: `Hola${user.firstName}`,
//       html: `<a href="http://localhost:8080/forgotpassword/${token}">aqui</a>`,
//     });
//   } catch (error) {
//     return res.send({ status: 'error', message: 'El email es inválido' });
//   }
// };

const RecoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { token } = req.params;
    const { password } = req.body;
    const result = await BdSessionManager.getEmail(token, password, email);
    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
//   const { email } = req.body;
//   try {
//     const user = await BdSessionManager.getEmail({ email: email });

//     res.cookie = ('token', token, { httpOnly: true, secure: true }).render('recoverLanding');
//   } catch (error) {}
// };
module.exports = {
  sessionLogin,
  loginRegister,
  current,
  forgotPassword,
  RecoverPassword,
};
