import jwt from 'jsonwebtoken';

const secret = 'thisIsASecretToPreventCrossSiteScripting';

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  try {
    return jwt.sign(payload, secret);
  } catch {
    return null;
  }
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export { setUser, getUser };
