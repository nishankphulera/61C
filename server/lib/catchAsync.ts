import type { Request, RequestHandler, Response } from "express";

/** Forwards rejected Promises to Express so `next(err)` hits JSON error middleware. */
export function catchAsync(
  handler: (req: Request, res: Response) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res)).catch(next);
  };
}
