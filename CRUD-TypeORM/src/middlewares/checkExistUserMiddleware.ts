import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import AppDataSource from "../data-source";
import { Usuarios } from "../entities/entity.usuarios";

export const checkExistUserMiddleware =
  (schema: AnySchema) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    //
    const checkBody = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const entity = AppDataSource.getRepository(Usuarios);
    const checkExist = await entity.findOneBy({ email: checkBody.email });

    if (checkExist) {
      return resp.status(400).json({ message: "E-mail existente" });
    }

    next();
  };
