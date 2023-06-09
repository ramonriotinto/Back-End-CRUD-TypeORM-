import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  status: number; // informando tipo da chave porque não existe no constructor
  constructor(message: string, status: number = 400) {
    super();
    this.message = message;
    this.status = status;
  }
}

export const errorIdentify = async (
  error: Error,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return resp.status(error.status).json({ message: error.message });
  }

  console.log(error); // caso o error não seja instancia de AppError

  return resp.status(500).json({ message: "Erro interno no servidor" });
};
