import express from 'express';
import protectroute from '../middlewares/auth.middleware.js';
import {getUserForSideBar,getMessages,sendMessages} from "../controllers/message.controller.js"
const router = express.Router();

router.get('/users',protectroute,getUserForSideBar);
router.get(':/id',protectroute,getMessages);
router.post('send/:id',protectroute,sendMessages)
export default router