import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const method = req.method;

  res.setHeader('Allow', ['GET', 'POST']);

  if (method === 'GET') {
    return res.status(200).json({ message: 'All users collected' });
  }

  if (method === 'POST') {
    return res.status(200).json({ message: 'User Successfully Created' });
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
