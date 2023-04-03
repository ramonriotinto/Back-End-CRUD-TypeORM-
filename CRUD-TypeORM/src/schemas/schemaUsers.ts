import * as yup from "yup";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";
import { SchemaOf } from "yup";

export const respUserSchema: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  isAdm: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

export const listRespUserSchema = yup.array(respUserSchema);

export const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
  name: yup.string().required(),
  password: yup.string().required(),
});

export const updateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
});
