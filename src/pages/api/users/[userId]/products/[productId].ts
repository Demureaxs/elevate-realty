import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

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
  const { productId } = req.query;

  if (typeof productId !== 'string') {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  if (method === 'PUT') {
    const { basketItemId, quantity } = req.body;

    try {
      const updatedBasketItem = await prisma.product.update({
        where: { id: Number(basketItemId) },
        data: {},
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
    const { productId } = req.query;

    try {
      await prisma.product.delete({
        where: { id: Number(productId) },
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

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
