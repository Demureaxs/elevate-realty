import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

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
      const basketItems = await prisma.basket.findMany({
        where: { authorId: Number(userId) },
        include: { product: true },
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
    const { productId, quantity } = req.body;

    try {
      const basketItem = await prisma.basket.create({
        data: {
          authorId: Number(userId),
          productId,
          quantity,
        },
      });

      return res.status(200).json({ data: basketItem });
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

  if (method === 'PUT') {
    const { basketItemId, quantity } = req.body;

    try {
      const updatedBasketItem = await prisma.basket.update({
        where: { id: Number(basketItemId) },
        data: { quantity },
      });

      return res.status(200).json({ data: updatedBasketItem });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Updating basket item failed',
          error: error.message,
        });
      } else {
        return res.status(500).json({
          message: 'Updating basket item failed',
          error: 'Unknown error',
        });
      }
    }
  }

  if (method === 'DELETE') {
    const { basketItemId } = req.body;

    try {
      await prisma.basket.delete({
        where: { id: Number(basketItemId) },
      });

      return res
        .status(200)
        .json({ message: 'Basket item successfully deleted' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Deleting basket item failed',
          error: error.message,
        });
      } else {
        return res.status(500).json({
          message: 'Deleting basket item failed',
          error: 'Unknown error',
        });
      }
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
