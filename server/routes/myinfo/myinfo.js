import express from 'express';

const router = express.Router();
import tokenAuth from '../../config/auth/auth.js'


router.get('/', tokenAuth.isAuthenticated(), (req, res) => {
  // console.log("email:" +req.user.email);
  res.json({
    result: 'success',
    email: req.user.email,
  });
})
export default router;