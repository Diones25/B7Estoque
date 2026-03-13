import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

// POST /api/users - Create a new user
router.post('/', userController.createUser);
router.get("/", userController.listUsers);
router.get("/:id", userController.getUser);

export default router;