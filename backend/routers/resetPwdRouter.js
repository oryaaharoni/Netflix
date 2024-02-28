import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getResetLink, resetPassword } from '../controllers/resetPwdController.js';

const resetRouter = express.Router();

resetRouter.post('/', expressAsyncHandler(getResetLink));
resetRouter.get('/:id/:token', expressAsyncHandler(resetPassword));

export default resetRouter;