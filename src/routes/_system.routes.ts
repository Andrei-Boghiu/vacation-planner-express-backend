import { Router } from "express";

import statusController from "../controllers/_system/status.controller";
import healthController from "../controllers/_system/health.controller";
import { authGuard } from "../middlewares/auth.middleware";

const router = Router();

router.get("/status", statusController);

router.use(authGuard);

router.get("/health", healthController);

export default router;
