// pages/api/auth/signin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';

type ResponseData = {
  data?: User[] | User | null;
  message?: string | null;
  token?: string | null;
  error?: string | null;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const method = req.method;

  if (method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Create a token
      const token = sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: '30d',
        }
      );

      return res.status(200).json({ data: user, token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Something went wrong' });
      }
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
