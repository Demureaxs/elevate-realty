import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { User } from '@prisma/client';

type ResponseData = {
  data?: User | null;
  message?: string;
  error?: string | null;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const method = req.method;
  const { userId } = req.query;

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
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
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

      if (user) {
        return res.status(200).json({ data: user });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Something went wrong' });
      }
    }
  }

  if (method === 'PUT') {
    try {
      const { username, email, password, role, avatarUrl } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          username,
          email,
          password,
          role,
          avatarUrl,
        },
      });

      return res.status(200).json({ data: updatedUser });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Something went wrong' });
      }
    }
  }

  if (method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: { id: Number(userId) },
      });

      return res.status(200).json({ message: 'User successfully deleted' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Something went wrong' });
      }
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
