import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/server/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const categories = await storage.getAllCategories();
        return res.status(200).json(categories);
      
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Categories API error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}