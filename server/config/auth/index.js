// 로그인 상태 체크
const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.status(409).json({
    result: 'error',
    message: "not login"
  })
};

exports.ensureAuthenticated = ensureAuthenticated;