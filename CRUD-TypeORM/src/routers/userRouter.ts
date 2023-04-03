import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  editeUserController,
  listUsersController,
} from "../controllers/usersControllers";
import { checkBodyUserMiddleware } from "../middlewares/checkBodyEditeMiddleware";
import { checkEditeBodyUserMiddleware } from "../middlewares/checkEditeBodyUserMiddleware";
import { checkExistIdUserMiddleware } from "../middlewares/checkExistIdUserMiddleware";
import { checkExistUserMiddleware } from "../middlewares/checkExistUserMiddleware";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { checkUserAdminMiddleware } from "../middlewares/checkUserAdminMiddleware";
import { updateSchema, userSchema } from "../schemas/schemaUsers";

export const userRouters = Router();

userRouters.post(
  "",
  checkExistUserMiddleware(userSchema),
  createUserController
);

userRouters.get(
  "",
  checkTokenMiddleware,
  checkUserAdminMiddleware,
  listUsersController
);

userRouters.delete(
  "/:id",
  checkExistIdUserMiddleware,
  checkTokenMiddleware,
  checkUserAdminMiddleware,
  deleteUserController
);

userRouters.patch(
  "/:id",
  checkTokenMiddleware,
  checkExistIdUserMiddleware,
  checkEditeBodyUserMiddleware,
  checkBodyUserMiddleware(updateSchema),
  editeUserController
);
/* checkBodyUserMiddleware(updateSchema) */
