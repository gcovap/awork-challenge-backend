import { Request, Response, NextFunction } from 'express';
import geoip from 'geoip-lite';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || '';
  const geo = geoip.lookup(ip);
  const userId = req.cookies.userId || 'unknown'

  logger.info(`${req.method} user:[${userId}] Start, url: ${req.url}, from:`, {
    ip: ip,
    device: req.get('user-agent'),
    location: geo ? `${geo.city}, ${geo.country}` : 'Location not found',
  });
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info(`${req.method} user:[${userId}] End, url: ${req.url}`, {
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}; 