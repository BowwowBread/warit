<<<<<<< HEAD
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

=======
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

>>>>>>> 88fec8cb233b369d91e1f5c72cc5473d0ba684dc
exports.ensureAuthenticated = ensureAuthenticated;