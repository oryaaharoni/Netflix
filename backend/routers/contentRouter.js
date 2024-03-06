import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {getContentByQuery, addToMyList, removeFromMyList, getAll, getContentById, getMovies, getSeries, getMyList, getContents } from '../controllers/contentController.js';
import { isAuth } from '../utils.js';

const contentRouter = express.Router();

contentRouter.get("/", isAuth, expressAsyncHandler(getAll));
contentRouter.get("/getContents", isAuth, expressAsyncHandler(getContents));
contentRouter.get("/movies", isAuth, expressAsyncHandler(getMovies));
contentRouter.get("/series", isAuth, expressAsyncHandler(getSeries));
contentRouter.post("/add", isAuth, expressAsyncHandler(addToMyList));
contentRouter.post("/remove", isAuth, expressAsyncHandler(removeFromMyList));
contentRouter.get("/search", isAuth, expressAsyncHandler(getContentByQuery));
contentRouter.get("/myList/:id", isAuth, expressAsyncHandler(getMyList));
contentRouter.get("/getById/:id", isAuth, expressAsyncHandler(getContentById));

export default contentRouter;