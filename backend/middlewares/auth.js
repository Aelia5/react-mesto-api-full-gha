const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;
  try {
    payload = jwt.verify(token, '075b1f9d4795eb0cda96f34e1bd1d072fb1d86ad38e54bea0dfb5a041ddec676');
//      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Необходима авторизация'));
    } else {
      next(err);
    }
  }
  req.user = payload;
  next();
};
