import AppDataSource from "../../data-source";
import { Usuarios } from "../../entities/entity.usuarios";
import { IUserUpdate } from "../../interfaces/users";
import { respUserSchema } from "../../schemas/schemaUsers";
import { hash } from "bcryptjs";

export const editeUserService = async (body: IUserUpdate, id: string) => {
  const { email, name, password } = body;

  const entityUser = AppDataSource.getRepository(Usuarios);

  const searchUser = await entityUser.findOneBy({ id: id });

  await entityUser.update(id, {
    name: name ? name : searchUser?.name,
    email: email ? email : searchUser?.email,
    password: password ? await hash(password, 10) : searchUser?.password,
  });

  const findUser = await entityUser.findOneBy({ id: id });

  const respUser = await respUserSchema.validate(findUser, {
    stripUnknown: true,
  });

  return respUser;
};

/* const editeUser = entity.create({
    ...searchUser,
    ...body,
  }); 
  await entity.save(editeUser); */
