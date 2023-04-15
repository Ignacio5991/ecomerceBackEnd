// export default function isAdmin(req, res, next) {
//     if (req.session.user.role == "admin") next();
//     return res.status(401).send({status: 401, error: "Unauthorized"});
//   }
const adminPermission = async (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado',
    });
  }
  next();
};

module.exports = adminPermission;
