import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'defaultSecret'; // use dotenv

export const authMiddleware = ({ req }) => {
  // token may be sent in headers, query, or body
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
  } catch {
    console.warn('Invalid token');
  }

  return req;
};
