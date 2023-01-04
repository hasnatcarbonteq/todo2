import "reflect-metadata";
import { Router } from "express";
import expressCallback from "../Utils/expressCallback";
import TodoController from "@controller/todo-controller";

const router = Router();

const todoController = new TodoController();

router.post("/create", expressCallback(todoController.create));
router.get("/get/:todoId", expressCallback(todoController.getById));
router.put("/update", expressCallback(todoController.update));
router.delete("/delete/:todoId", expressCallback(todoController.delete));
router.get("/getByUserId/:userId", expressCallback(todoController.getByUserId));
router.get("/getAll", expressCallback(todoController.getAll));

export default router;
