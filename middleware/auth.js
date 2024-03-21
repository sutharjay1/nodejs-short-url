import { getUser } from '../service/auth.js';

function checkForAuthentication(req, res, next) {
  const userUid = req.cookies?.uid;
}

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect('/login');
  const user = getUser(userUid);

  if (!user) return res.redirect('/login');

  req.user = user;

  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);

  //   const userUid = req.headers['authorization'];
  //   const token = userUid.split('Bearer ')[1];
  //   const user = getUser(token);

  req.user = user;

  next();
}

export { restrictToLoggedInUserOnly, checkAuth };
