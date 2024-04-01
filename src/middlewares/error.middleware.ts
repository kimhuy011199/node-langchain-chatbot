import { NextFunction, Request, Response } from 'express';
import HttpStatusCode from '../shared/enums/HttpStatus';

declare global {
  interface Error {
    statusCode: number;
    status: number;
  }
}

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    err?.statusCode || err?.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || '';
  console.log(err.stack);

  res.status(statusCode).json({ message, statusCode });
};

export default errorMiddleware;
