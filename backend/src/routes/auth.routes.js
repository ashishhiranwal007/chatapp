import express, { Router } from 'express';
import { login,logout,signup } from '../controllers/auth.controller.js';
import {protectroute} from '../middlewares/auth.middleware.js';
import {updateprofile} from '../controllers/user.controller.js';
const router = express.Router();
router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.post('/update-profile',protectroute,updateprofile)
export default router;