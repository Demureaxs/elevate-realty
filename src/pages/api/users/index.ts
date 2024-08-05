import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { User } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import verifySuperUser from '@/middleware/verifySuperUser';
import verifyAdmin from '@/middleware/verifyAdmin';

type ResponseData = {
  data?: User[] | User | null;
  message?: string | null;
  count?: number | null;
  error?: string | null;
  token?: string | null;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const method = req.method;
  const { userId } = req.query; // dynamic route parameter
  const email = req.user?.email;
  const id = req.user?.id;
  const role = req.user?.role;

  //   const password = 'password';
  //   const hashedPassword = await hash(password, 12);
  //   console.log('Hashed Password:', hashedPassword);
  //   const isPasswordValid = await compare(password, hashedPassword);
  //   console.log('Password is valid:', isPasswordValid);
  // Get Method for the endpoint users which allows to see all users
  // Should be locked to admin only

  if (method === 'GET') {
    const {
      includeAddress,
      includeBasket,
      includeRentals,
      includeRentalItems,
      includeTransactions,
      includeViewings,
    } = req.query;

    try {
      const users = await prisma.user.findMany({
        include: {
          address: includeAddress === 'true',
          basket:
            includeBasket === 'true'
              ? {
                  include: {
                    product: true,
                  },
                }
              : false,
          rentals:
            includeRentals === 'true'
              ? {
                  include: {
                    rentalItems: true,
                    property: true,
                  },
                }
              : false,

          rentalItems: includeRentalItems === 'true' ? true : false,
          transactions: includeTransactions === 'true' ? true : false,
          viewing: includeViewings === 'true' ? true : false,
        },
      });
      return res.status(200).json({ data: users, count: users.length });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Unknown error' });
      }
    }
  }

  if (method === 'POST') {
    const { username, email, password, role, avatarUrl }: User =
      req.body as User;

    // If no username, use the first portion of the email

    try {
      const userNameToUse = username || email.split('@')[0];
      // Hash the password before saving the user
      const hashedPassword = await hash(password, 12);
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
          expiresIn: '30d',
        }
      );

      return res.status(200).json({ data: newUser, token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Something went wrong' });
      }
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default verifySuperUser(handler);
// export default handler;
