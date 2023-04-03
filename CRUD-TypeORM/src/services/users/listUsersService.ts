import AppDataSource from "../../data-source";
import { Usuarios } from "../../entities/entity.usuarios";
import { listRespUserSchema } from "../../schemas/schemaUsers";

export const listUsersService = async () => {
  const entity = AppDataSource.getRepository(Usuarios);

  const listUsers = await entity.find();

  const respUser = await listRespUserSchema.validate(listUsers, {
    stripUnknown: true,
  });

  return respUser;
};
