import express from "express";
import UserController from '../api/user/user.controller';
var router = express.Router();

router.use('/api', UserController)
export default router;