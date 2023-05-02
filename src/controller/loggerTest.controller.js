const tesTer = (req, res) => {
  req.logger.fatal('Este es un mensaje de error fatal');
  req.logger.error('Este es un mensaje de error');
  req.logger.warn('Este es un mensaje de advertencia');
  req.logger.info('Este es un mensaje informativo');
  req.logger.http('logger');
  req.logger.debug('Este es un mensaje de depuración');
  res.json('${ logger }');
};

module.exports = {
  tesTer,
};
