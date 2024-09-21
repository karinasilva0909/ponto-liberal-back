import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                username: string;
                roleId: number;
                token?: string;
            };
        }
    }
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded: any) => {
        if (err) {
            req.user = undefined;
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const { id, username, roleId, iat, exp } = decoded as {
            id: string | number;
            username: string;
            roleId: string | number;
            iat: number;
            exp: number;
        };

        const now = Math.floor(Date.now() / 1000);
        const tokenAge = now - iat;
        const tokenTTL = exp - now;

        if (tokenAge > 300 && tokenTTL > 0 && tokenTTL < 3600) {
            const newToken = jwt.sign({ id, username, roleId }, process.env.JWT_SECRET!, {
                expiresIn: '1h',
            });

            req.user = {
                id: typeof id === 'string' ? parseInt(id) : id,
                username,
                roleId: typeof roleId === 'string' ? parseInt(roleId) : roleId,
                token: newToken,
            };

            res.setHeader('x-new-token', newToken);
        } else {
            req.user = {
                id: typeof id === 'string' ? parseInt(id) : id,
                username,
                roleId: typeof roleId === 'string' ? parseInt(roleId) : roleId,
            };
        }

        next();
    });
};

export default AuthMiddleware;
