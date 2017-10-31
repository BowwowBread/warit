import jwt from 'jsonwebtoken'
import compose from 'composable-middleware'

function signToken(user, secret) {
  return jwt.sign({
    email: user.email,
    username : user.username,
    auth_provider : user.auth_provider,
    profile_image : user.profile_image,
  }, secret, {
    expiresIn: '7d'
  })
}
function checkAdmin() {
  return compose()
    .use(function (req, res, next) {
      const adminToken = req.headers.authorization
      if(adminToken == "waritAdminToken") {
        next()
      } else {
        res.status(403).json({
          result: 'error',
          message: 'not admin'
        })
      }
    })
}
function isAuthenticated() {
  return compose()
    .use(function (req, res, next) {
      const token = req.headers.authorization
      if (token) {
        const secret = req.app.get('jwt-secret')
        try {
          const decode = jwt.verify(token, secret)
          req.user = decode
          req.userToken = token
          next()
        } catch (err) {
          res.status(403).json({
            result: 'error',
            message: err.message
          })
        }
      } else {
        res.status(403).json({
          result: 'error',
          message: 'not token'
        })
      }
    })
    .use(function (req, res, next) {
      req.user = {
        email: req.user.email,
        username: req.user.username,
        auth_provider: req.user.auth_provider,
        profile_image: req.user.profile_image
      }
      next()
    })
}

exports.signToken = signToken
exports.isAuthenticated = isAuthenticated
exports.checkAdmin = checkAdmin