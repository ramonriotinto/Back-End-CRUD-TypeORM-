import AppDataSource from "../../data-source";
import { Usuarios } from "../../entities/entity.usuarios";
import { AppError } from "../../errors/appError";

export const deleteUserService = async (id: string) => {
  //
  const entityUser = AppDataSource.getRepository(Usuarios);

  const searchUserDelete = await entityUser.findOneBy({ id: id });

  if (!searchUserDelete?.isActive) {
    throw new AppError("Usuário ja se encontra inativo", 400);
  }

  await entityUser.update(id, { isActive: false });

  return [searchUserDelete, 204];
};

/* await entity.softRemove(searchUserDelete);  */

/*   const saveUserDelete = await entity.save({
    ...searchUserDelete,
    isActive: false,
  }); */
