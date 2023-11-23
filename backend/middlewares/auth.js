const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.auth = (req, res, next) => {
  console.log('Идёт авторизация');
  console.log(req.headers);
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, '075b1f9d4795eb0cda96f34e1bd1d072fb1d86ad38e54bea0dfb5a041ddec676');
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
