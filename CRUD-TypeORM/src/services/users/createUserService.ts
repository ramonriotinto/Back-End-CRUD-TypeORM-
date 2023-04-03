import AppDataSource from "../../data-source";
import { Usuarios } from "../../entities/entity.usuarios";
import { IUser, IUserRequest } from "../../interfaces/users";
import { respUserSchema } from "../../schemas/schemaUsers";

export const createUserService = async (
  bodyUser: IUserRequest
): Promise<IUser> => {
  const entityUser = AppDataSource.getRepository(Usuarios);

  const createdUser = entityUser.create(bodyUser);

  await entityUser.save(createdUser);

  const respUser = await respUserSchema.validate(createdUser, {
    stripUnknown: true,
  });

  return respUser;
};
