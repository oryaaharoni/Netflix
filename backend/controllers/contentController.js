import Content from '../models/Content.js'

export const getAll = async (req, res) => {
    const content = await Content.find({});
    res.send(content);
}

export const getContentById = async (req, res) => {
    const { id } = req.params;

    const content = await Content.findById(id);
    res.send(content);
}

export const getMovies = async (req, res) => {
    const movies = await Content.find({ isSeries: false });
    res.send(movies);
}

export const getSeries = async (req, res) => {
    const series = await Content.find({ isSeries: true });
    res.send(series);
}

export const getCategories = async (req, res) => {
    const categories = await Content.find().distinct("genre");
    res.send(categories);
}