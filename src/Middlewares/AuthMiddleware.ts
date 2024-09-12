import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extensão da interface Request
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                username: string;
                roleId: number;
            };
        }
    }
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            req.user = undefined;
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const { id, username, roleId } = decoded as { id: string | number; username: string; roleId: string | number };

        req.user = {
            id: typeof id === 'string' ? parseInt(id) : id,
            username,
            roleId: typeof roleId === 'string' ? parseInt(roleId) : roleId,
        };

        next();
    });
};

export default AuthMiddleware;
