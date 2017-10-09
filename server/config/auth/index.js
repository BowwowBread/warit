// 로그인 상태 체크
const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  } else {
    res.json({
      result: "fail",
      message: "login please"
    })
  }
};

exports.ensureAuthenticated = ensureAuthenticated;