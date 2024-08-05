// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';

type ResponseData = {
  data?: User | null;
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
    const { username, email, password, role, avatarUrl }: User =
      req.body as User;

    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await hash(password, 12);

      // If no username, use the first portion of the email
      const userNameToUse = username || email.split('@')[0];

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          username: userNameToUse,
          email,
          password: hashedPassword,
          role,
          avatarUrl,
        },
      });

      // Create a token
      const token = sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: '30d', // Token valid for 30 days
        }
      );

      return res.status(201).json({ data: newUser, token });
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
