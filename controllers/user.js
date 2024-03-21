import User from '../model/user.js';
import { v4 as uuidv4 } from 'uuid';
import { setUser } from '../service/auth.js';

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect('/');
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user.email === email && user.password === password) {
    const token = setUser(user);

    res.cookie('uid', token);

    return res.redirect('/');
    // return res.json({
    //   token: token,
    // });
  } else {
    return res.redirect('/login');
  }
}

export { handleUserSignUp, handleUserLogin };
