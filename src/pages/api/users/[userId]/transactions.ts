import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { Transaction } from '@prisma/client';

type ResponseData = {
  transactions?: Transaction[] | Transaction | null;
  message?: string;
  error?: string;
  count?: number;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { userId } = req.query;
  const method = req.method;

  if (method === 'GET') {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { authorId: Number(userId) },
        include: {
          rentalItem: true,
          product: true,
        },
      });

      return res.status(200).json({ transactions });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Something went wrong' });
      }
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
