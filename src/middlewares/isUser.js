const userPermission = async (req, res, next) => {
  console.log(req.user);
  if (!req.user || req.user?.role !== 'user') {
    return res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado',
    });
  }
  next();
};

module.exports = userPermission;
