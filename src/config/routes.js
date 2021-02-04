import express from "express";
import UserController from '../api/user/user.controller';
var router = express.Router();

router.use('/api/v1', UserController)
export default router;