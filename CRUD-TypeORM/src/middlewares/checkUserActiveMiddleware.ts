import { Request, Response, NextFunction } from "express";

export const checkUserActiveMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  //
  const userIsActive = req.user.isActive;

  if (userIsActive === false) {
    return resp.status(400).json({ message: "Usuário desativado" });
  }

  next();
};
