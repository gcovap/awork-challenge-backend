import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface CustomError extends Error {
  status?: number;
  code?: string;
}

export const errorLogger = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error processing request', {
    error: {
      message: error.message,
      stack: error.stack,
      code: error.code,
    },
    request: {
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  });

  next(error);
}; 