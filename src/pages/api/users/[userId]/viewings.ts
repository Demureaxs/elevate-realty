import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { Viewing } from '@prisma/client';

type ResponseData = {
  data?: Viewing[] | Viewing | null;
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
      const viewings = await prisma.viewing.findMany({
        where: { authorId: Number(userId) },
        include: {
          property: true,
        },
      });

      return res.status(200).json({ data: viewings });
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

export default handler;
