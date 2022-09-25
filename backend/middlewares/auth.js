const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const AuthError = require('./errors/auth-error');

const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return next(new AuthError('Необходима авторизация'));
//   }
//   const token = authorization.replace('Bearer ', '');
//   let payload = jwt.verify(token, 'some-secret-key');
//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     return next(new AuthError('Необходима авторизация'));
//   }
//   req.user = payload;
//   return next();

  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
