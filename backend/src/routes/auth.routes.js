import express, { Router } from 'express';
import { login,logout,signup,updateProfile ,checkauth,getprofile} from '../controllers/auth.controller.js';
import protectroute from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.post('/update-profile',protectroute,updateProfile)

router.get('/check-auth',protectroute,checkauth);

router.get('/profilepic',protectroute,getprofile)
export default router;