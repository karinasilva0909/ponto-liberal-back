import * as express from 'express';

interface User {
  id: number;
  username: string;
  roleId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
