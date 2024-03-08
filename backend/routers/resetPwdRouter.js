import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getResetLink, getNewPassword } from '../controllers/resetPwdController.js';

const resetRouter = express.Router();

resetRouter.post('/', expressAsyncHandler(getResetLink));
resetRouter.post('/getNewPwd', expressAsyncHandler(getNewPassword));

export default resetRouter;