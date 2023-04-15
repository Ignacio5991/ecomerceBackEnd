// export default function isUser(req, res, next) {
//   if (req.session.user.role == 'user') next();
//   return res.status(401).send({ status: 401, error: 'Unauthorized' });
// }
const userPermission = async (req, res, next) => {
  if (req.session.user.role !== 'user') {
    return res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado',
    });
  }
  next();
};

module.exports = userPermission;
