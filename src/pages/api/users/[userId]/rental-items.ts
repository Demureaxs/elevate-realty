import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { RentalItem } from '@prisma/client';

type ResponseData = {
  data?: RentalItem[] | RentalItem | null;
  message?: string;
  error?: string;
  count?: number;
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

  // **GET**: Fetch rental items related to a user
  if (method === 'GET') {
    try {
      const rentalItems = await prisma.rentalItem.findMany({
        where: { authorId: Number(userId) }, // Filter rental items based on user ID
        include: { rentals: true }, // Include related rental data
      });

      return res.status(200).json({ data: rentalItems });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'Internal server error', error: 'Unknown error' });
      }
    }
  }

  // **POST**: Create a new rental item
  if (method === 'POST') {
    const {
      propertyId,
      name,
      description,
      price,
      available,
      stock,
      imageUrls,
    } = req.body as RentalItem;

    try {
      const newRentalItem = await prisma.rentalItem.create({
        data: {
          user: { connect: { id: Number(userId) } }, // Connect the user record
          property: { connect: { id: Number(propertyId) } }, // Connect the property record
          name,
          description,
          price,
          available,
          stock,
          imageUrls,
        },
      });

      return res.status(200).json({ data: newRentalItem });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Rental item creation failed',
          error: error.message,
        });
      } else {
        return res.status(500).json({
          message: 'Rental item creation failed',
          error: 'Unknown error',
        });
      }
    }
  }

  // **PUT**: Update a rental item (without `startDate` and `endDate`)
  if (method === 'PUT') {
    const {
      rentalItemId,
      name,
      description,
      price,
      available,
      stock,
      imageUrls,
    } = req.body;

    try {
      const updatedRentalItem = await prisma.rentalItem.update({
        where: { id: Number(rentalItemId) },
        data: {
          name,
          description,
          price,
          available,
          stock,
          imageUrls,
        },
      });

      return res.status(200).json({ data: updatedRentalItem });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: 'Rental item update failed', error: error.message });
      } else {
        return res.status(500).json({
          message: 'Rental item update failed',
          error: 'Unknown error',
        });
      }
    }
  }

  // **DELETE**: Delete a rental item
  if (method === 'DELETE') {
    const { rentalItemId } = req.body;

    try {
      await prisma.rentalItem.delete({
        where: { id: Number(rentalItemId) },
      });

      return res
        .status(200)
        .json({ message: 'Rental item successfully deleted' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Rental item deletion failed',
          error: error.message,
        });
      } else {
        return res.status(500).json({
          message: 'Rental item deletion failed',
          error: 'Unknown error',
        });
      }
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
