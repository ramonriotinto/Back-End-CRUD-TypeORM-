import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkTokenMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  let userToken = req.headers.authorization;

  if (!userToken) {
    return resp.status(401).json({
      message: "Token inexistente",
    });
  }

  userToken = userToken.split(" ")[1];

  return jwt.verify(
    userToken,
    process.env.SECRET_KEY!,
    (error, decoded: any) => {
      if (error) {
        return resp.status(401).json({
          message: "Token inválido!",
        });
      }

      req.user = {
        id: decoded.sub,
        isAdm: decoded.isAdm,
        isActive: decoded.isActive,
      };

      return next();
    }
  );
};
