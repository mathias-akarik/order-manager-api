import { Router } from 'express';
import { getMenu } from '../controllers/menuController';

const router = Router();

// Add `/api` as the prefix for the menu route
router.get('/menu', getMenu);

export default router;
