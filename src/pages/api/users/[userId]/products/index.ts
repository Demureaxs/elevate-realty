import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { Product } from '@prisma/client';

type ResponseData = {
  message?: string;
  data?: any;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const method = req.method;
  const { userId } = req.query;

  if (typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  if (method === 'GET') {
    try {
      const basketItems = await prisma.product.findMany({
        where: { user: { id: Number(userId) } },
      });

      return res.status(200).json({ data: basketItems });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: 'Internal server error', error: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'Internal server error', error: 'Unknown error' });
      }
    }
  }

  if (method === 'POST') {
    const { name, description, price, category, stock, imageUrls }: Product =
      req.body;

    try {
      const productItem = await prisma.product.create({
        data: {
          name,
          description,
          price,
          category,
          stock,
          imageUrls,
          user: { connect: { id: Number(userId) } },
        },
      });

      return res.status(200).json({ data: productItem });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Adding item to basket failed',
          error: error.message,
        });
      } else {
        return res.status(500).json({
          message: 'Adding item to basket failed',
          error: 'Unknown error',
        });
      }
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
