import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { addToMyList, removeFromMyList, getAll, getContentById, getMovies, getSeries, getMyList } from '../controllers/contentController.js';
import { isAuth } from '../utils.js';

const contentRouter = express.Router();

contentRouter.get("/", isAuth, expressAsyncHandler(getAll));
contentRouter.get("/movies", isAuth, expressAsyncHandler(getMovies));
contentRouter.get("/series", isAuth, expressAsyncHandler(getSeries));
contentRouter.post("/add", isAuth, expressAsyncHandler(addToMyList));
contentRouter.post("/remove", isAuth, expressAsyncHandler(removeFromMyList));
contentRouter.get("/myList/:id", isAuth, expressAsyncHandler(getMyList));
contentRouter.get("/getById/:id", isAuth, expressAsyncHandler(getContentById));

export default contentRouter;