import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getResetLink, resetPassword, getNewPassword } from '../controllers/resetPwdController.js';

const resetRouter = express.Router();

resetRouter.post('/', expressAsyncHandler(getResetLink));
resetRouter.post('/getNewPwd', expressAsyncHandler(getNewPassword));
resetRouter.get('/:id/:token', expressAsyncHandler(resetPassword));

export default resetRouter;