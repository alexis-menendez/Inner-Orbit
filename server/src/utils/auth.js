import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'defaultSecret';

export function signToken(user) {
  return jwt.sign(
    { data: { _id: user._id, email: user.email } },
    secret,
    { expiresIn: '2h' }
  );
}
