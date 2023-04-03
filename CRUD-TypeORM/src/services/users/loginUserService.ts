import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Usuarios } from "../../entities/entity.usuarios";
import { AppError } from "../../errors/appError";
import "dotenv/config";

export const loginUserService = async ({ email, password }: IUserLogin) => {
  const entity = AppDataSource.getRepository(Usuarios);

  const checkUser = await entity.findOneBy({ email: email });
  if (!checkUser) {
    throw new AppError("Email ou senha incorretos", 403);
  }

  const checkPassword = await compare(password, checkUser.password);
  if (!checkPassword) {
    throw new AppError("Email ou senha incorretos", 403);
  }

  const tokenUser = jwt.sign(
    { isAdm: checkUser.isAdm, isActive: checkUser.isActive },
    process.env.SECRET_KEY!,
    {
      subject: checkUser.id,
      expiresIn: "8h",
    }
  );

  return tokenUser;
};
