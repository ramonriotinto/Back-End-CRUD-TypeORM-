import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const checkEditeBodyUserMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const idUser = req.body.id;
  const adm = req.body.isAdm;
  const active = req.body.isActive;

  if (idUser != undefined) {
    throw new AppError("Não é possivel atualizar o ID", 401);
  }
  if (adm != undefined) {
    throw new AppError("Não é possivel atualizar o campo isAdm", 401);
  }
  if (active != undefined) {
    throw new AppError("Não é possivel atualizar o campo isActive", 401);
  }

  return next();
};
