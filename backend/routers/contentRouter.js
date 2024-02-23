import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getAll, getContentById, getMovies, getSeries } from '../controllers/contentController.js';
import { isAuth } from '../utils.js';

const contentRouter = express.Router();

contentRouter.get("/", isAuth, expressAsyncHandler(getAll));
contentRouter.get("/getMovies", isAuth, expressAsyncHandler(getMovies));
contentRouter.get("/getSeries", isAuth, expressAsyncHandler(getSeries));
contentRouter.get("/getById/:id", isAuth, expressAsyncHandler(getContentById));

export default contentRouter;