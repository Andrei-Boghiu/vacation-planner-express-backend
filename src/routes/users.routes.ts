import { Router } from "express";

import getMeController from "../controllers/users/getMe.controller";
import getUserByIdController from "../controllers/users/getUserById.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import { authGuard, managerRoleGuard } from "../middlewares/auth.middleware";

const router = Router();

router.use(authGuard);

router.get("/me", getMeController);
router.patch("/", updateUserController);

router.use(managerRoleGuard);

router.get("/:id", getUserByIdController);

export default router;
