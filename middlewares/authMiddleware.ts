import { Request, Response, NextFunction } from 'kuaralabs-afterworkjs';
import jwt from 'jsonwebtoken';

const authMiddleware = (secret: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'string') {
      res.statusCode = 401;
      res.end('Unauthorized');
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.statusCode = 401;
      res.end('Unauthorized');
      return;
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }
      (req as any).user = user; // Type assertion to avoid TypeScript issues
      next();
    });
  };
};

export { authMiddleware };
