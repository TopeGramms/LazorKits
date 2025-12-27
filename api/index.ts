// Vercel serverless function handler
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { api } from '../shared/routes';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle API routes
  if (req.url?.startsWith('/api/health')) {
    return res.json({ status: 'ok' });
  }

  // For all other routes, serve the static index.html (SPA routing)
  // Vercel will handle static files automatically via vercel.json
  return res.status(404).json({ error: 'Not found' });
}
