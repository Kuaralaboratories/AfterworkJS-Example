import { Request, Response, NextFunction } from 'kuaralabs-afterworkjs';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next(); // Move to the next middleware or route handler
};

export { requestLogger };