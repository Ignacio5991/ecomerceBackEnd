const { hash } = require('bcrypt');
const DTOsUser = require('../dao/DTOs/user.dto');
const userModel = require('../dao/models/users.model');
const User = require('../dao/models/users.model');
const BdSessionManager = require('../dao/mongoManager/BdSessionManager');
const mailingService = require('../service/mailing.service');
const { getUser } = require('../service/users.service');
const { comparePassword, hashpassword } = require('../utils/hashpassword');
const { generateToken, getPayload } = require('../utils/jwt');
const BdUsersManager = require('../dao/mongoManager/BdUsersManager');

const sessionLogin = async (req, res) => {
  res.send(req.user);
};

const loginRegister = async (req, res) => {
  const dtoUser = DTOsUser(req.user);
  req.session.user = dtoUser;

  res.send(dtoUser);

  await BdUsersManager.lastConnection(req.user, new Date().toLocaleString());
};

const current = async (req, res) => {
  res.send(req.user);
};

// const lastConnection = async (req, res, next) => {
//   try {
//     const userId = req.params.Id;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     } else {
//       res.json({ last_connection: user.last_connection });
//     }
//   } catch (error) {
//     next;
//   }
// };

const forgotPassword = async (req, res, next) => {
  try {
    let { email } = req.body;
    const user = await BdSessionManager.getEmail({ email: email });
    if (user === null) {
      return res.status(404).json({ message: 'Mail no valido' });
    }
    let token = generateToken({ id: user.id });
    mailingService.sendMail({
      to: user.email,
      subject: `Hola${user.firstName}`,
      html: `<a href="http://localhost:8080/api/session/redirectForgotPassword/${token}">aqui</a>`,
    });
    res.json({
      status: 'sucess',
      message: `Se envio un correo de recuperacion a ${user.email}`,
    });
  } catch (error) {
    return res.send({ status: 'error', message: 'El email es inválido' });
  }
};

const redirectRecoverPassword = (req, res, next) => {
  try {
    console.log(req.params.token);
    const token = req.params.token;
    res.cookie('token', token).redirect(`/recover-password`);
  } catch (error) {
    next(error);
  }
};

const RecoverPassword = async (req, res, next) => {
  try {
    const password = await comparePassword(req.body.password, req.payload.password);
    if (!password) {
      const hashNewPassword = await hashpassword(req.body.password);
      const updateUser = await BdSessionManager.updatePassword(hashNewPassword, req.payload.id);

      return res.cookie('token', '', { maxAge: 1 }).status(202).json({
        status: 'sucess',
        message: 'La contraseña es muy original. Cambio efectuado con exito',
      });
    } else {
      res.status(403).json({
        status: 'error',
        message: 'La contraseña no puede ser igual a la que olvido genio',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res) => {
  const id = req.params.uid;
  const rol = req.body;
  const user = req.user;

  if (req.user.role === 'user') {
    const update = await BdSessionManager.UpdateRole(id, rol);
    return res.status(200).json({
      status: 'success',
      message: 'Rol actualizado',
      data: update,
    });
  } else {
    req.user.role === 'premium';
    const update = await BdSessionManager.UpdateRole(id, rol);
    return res.status(200).json({
      status: 'success',
      message: 'Rol actualizado',
      data: update,
    });
  }
};

const uploadDocs = async (req, res) => {
  try {
    let user = await um.getOne({ email: req.user.email });

    let userDocuments = [];

    user.documents.forEach((element) => {
      userDocuments.push(element.name);
    });

    if (req.files.identification) {
      let exists = userDocuments.findIndex((element) => element == 'identification');
      let extension = req.files.identification[0].originalname.split('.');
      let file = { name: 'identification', reference: `/public/userImages/${req.user.email}-identification.${extension[1]}` };

      if (exists != -1) {
        user.documents[exists] = file;
      } else {
        user.documents.push(file);
      }
    }
    if (req.files.location) {
      let exists = userDocuments.findIndex((element) => element == 'location');
      let extension = req.files.location[0].originalname.split('.');
      let file = { name: 'location', reference: `/public/userImages/${req.user.email}-location.${extension[1]}` };

      if (exists != -1) {
        user.documents[exists] = file;
      } else {
        user.documents.push(file);
      }
    }
    if (req.files.accState) {
      let exists = userDocuments.findIndex((element) => element == 'accState');
      let extension = req.files.accState[0].originalname.split('.');
      let file = { name: 'accState', reference: `/public/userImages/${req.user.email}-accState.${extension[1]}` };

      if (exists != -1) {
        user.documents[exists] = file;
      } else {
        user.documents.push(file);
      }
    }

    BdSessionManager.editOne(user.email, user);

    res.send({ status: 'Ok', message: 'Archivos guardados correctamente' });
  } catch (error) {
    next(error);
  }
};

const AreDocumentsRepeated = async (req, res, next) => {
  try {
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    if (Object.getOwnPropertyNames(req.files).length == 0) return res.send({ status: 'error', message: 'No se enviaron documentos' });

    let email = req.params.uid;

    let user = await BdSessionManager.getOne({ email });

    let isValid = true;
    let repeatedDocs = [];

    user.documents.forEach((element) => {
      if (req.files[element.name]) {
        repeatedDocs.push(element.name);
        isValid = false;
      }
    });

    if (!isValid) return res.send({ status: 'error', message: `Los campos repetidos son ${repeatedDocs}` });

    res.send({ status: 'Ok', message: 'All documents are new' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sessionLogin,
  loginRegister,
  current,
  forgotPassword,
  redirectRecoverPassword,
  RecoverPassword,
  updateRole,
  uploadDocs,
  AreDocumentsRepeated,
};
