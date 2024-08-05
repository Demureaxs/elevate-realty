// src/global.d.ts
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  var prisma: PrismaClient | undefined;
}

declare module 'next' {
  interface NextApiRequest {
    user?: JwtPayload & { id: number; email: string; role: string }; // Extend JwtPayload with your custom properties
  }
}

export default global;
