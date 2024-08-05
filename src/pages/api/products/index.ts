import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Product } from '@prisma/client';

type ResponseData = {
  data?: Product[] | Product | null;
  message?: string | null;
  count?: number | null;
  error?: string | null;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const method = req.method;

  if (method === 'GET') {
    try {
      const products = await prisma.product.findMany({});

      return res.status(200).json({ data: products, count: products.length });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Unknown error' });
      }
    }
  }

  if (method === 'POST') {
    return res.status(200).json({ message: 'Product Successfully Posted' });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
