import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const method = req.method;

  if (method === 'GET') {
    res.status(200).json({ message: 'Products got by id' });
  }

  if (method === 'PUT') {
    return res.status(200).json({ message: 'Products Successfully updated' });
  }

  if (method === 'DELETE') {
    return res.status(200).json({ message: 'Products Successfully deleted' });
  }
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
