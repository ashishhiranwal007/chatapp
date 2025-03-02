import express from 'express';
import protectroute from '../middlewares/auth.middleware';
const router = express.Router();

router.get('/users',protectroute,getUserForSideBar);
router.get(':/id',protectroute,getMessages);
export default router