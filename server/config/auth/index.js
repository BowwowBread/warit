// 로그인 상태 체크
const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { 
    res.json({
      result: 'login',
      message: "asd"
    });
    return next(); 
  }
  res.json({
    result: 'error',
    message: "asd"
  })
};

exports.ensureAuthenticated = ensureAuthenticated;