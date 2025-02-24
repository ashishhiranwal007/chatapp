import express, { Router } from 'express';

const router = express.Router();
router.get('/signup',() => {
    console.log("Signup route");
})

router.post('/login',() => {
    console.log("Login route");
})

router.get('/logout',() => {
    console.log("Logout route");
})

export default router