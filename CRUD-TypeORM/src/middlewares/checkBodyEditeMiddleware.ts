import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const checkBodyUserMiddleware =
  (schema: AnySchema) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const checkBody = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.body = checkBody;

      return next();
    } catch (error) {
      return resp.status(400).json({ message: error });
    }
  };
