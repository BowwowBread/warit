// 로그인 인증
const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.redirect('/login');
};

exports.ensureAuthenticated = ensureAuthenticated;