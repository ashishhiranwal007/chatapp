import express from 'express';
import protectroute from '../middlewares/auth.middleware';
const router = express.Router();

router.get('/users',protectroute,getUserForSideBar);

export default router