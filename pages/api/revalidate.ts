import { NextApiRequest, NextApiResponse } from 'next';

// This API route is used for on-demand revalidation (ISR)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const path = req.query.path as string;
    
    if (!path) {
      return res.status(400).json({ message: 'Path is required' });
    }

    // Revalidate the path
    await res.revalidate(path);
    
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}