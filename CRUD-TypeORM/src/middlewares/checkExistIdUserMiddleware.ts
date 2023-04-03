import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Usuarios } from "../entities/entity.usuarios";

export const checkExistIdUserMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  //
  const entity = AppDataSource.getRepository(Usuarios);
  const checkExistId = await entity.findOneBy({ id: req.params.id });

  if (!checkExistId) {
    return resp.status(404).json({ message: "Usuário não existe" });
  }

  next();
};
