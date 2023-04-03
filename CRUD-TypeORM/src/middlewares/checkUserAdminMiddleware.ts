import { NextFunction, Request, Response } from "express";

export const checkUserAdminMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  //
  const user = req.user.isAdm;

  if (user === false) {
    return resp.status(403).json({ message: "Sem autorização" });
  }

  next();
};
