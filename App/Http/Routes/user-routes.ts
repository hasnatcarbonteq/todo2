import "reflect-metadata";
import { Router } from "express";
import expressCallback from "../Utils/expressCallback";
import UserController from "@controller/user-controller";

const router = Router();

const userController = new UserController();

router.post("/login", expressCallback(userController.login));
router.post("/register", expressCallback(userController.register));

export default router;
