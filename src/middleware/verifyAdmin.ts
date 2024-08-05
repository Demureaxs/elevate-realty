// middleware/verifyAdmin.ts

import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyAdmin =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // Check if the user has the ADMIN role
      if (decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_USER') {
        return res
          .status(403)
          .json({ error: 'Forbidden: Insufficient privileges' });
      }

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };

export default verifyAdmin;
