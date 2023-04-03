import { Request, Response } from "express";
import { Usuarios } from "../entities/entity.usuarios";
import { IUserLogin, IUserRequest } from "../interfaces/users";
import { createUserService } from "../services/users/createUserService";
import { deleteUserService } from "../services/users/deleteUserService";
import { editeUserService } from "../services/users/editeUserService";
import { listUsersService } from "../services/users/listUsersService";
import { loginUserService } from "../services/users/loginUserService";

export const createUserController = async (req: Request, resp: Response) => {
  const bodyUser: IUserRequest = req.body;
  //tipando corpo recebido do usuario

  const createUser = await createUserService(bodyUser);

  return resp.status(201).json(createUser);
};

export const loginUserController = async (req: Request, resp: Response) => {
  const bodyLogin: IUserLogin = req.body;
  const token = await loginUserService(bodyLogin);
  return resp.status(200).json({ token });
};

export const listUsersController = async (req: Request, resp: Response) => {
  const listUsers = await listUsersService();
  return resp.status(200).json(listUsers);
};

export const deleteUserController = async (req: Request, resp: Response) => {
  const deletedUser = await deleteUserService(req.params.id);
  /* return resp.status(204).json(deletedUser); */
  //a bruxaria do teste só funcionou desse jeito
  if (deletedUser instanceof Usuarios) {
    return resp.json(deletedUser);
  }
  return resp
    .status(deletedUser[1] as number)
    .json({ message: deletedUser[0] });
};

export const editeUserController = async (req: Request, resp: Response) => {
  const editeUser = await editeUserService(req.body, req.params.id);
  return resp.status(200).json(editeUser);
};
