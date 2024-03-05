import User from "../models/User.js";
import Content from "../models/Content.js";
import { data, genres, listMovieNames, listSeriesNames } from "../data.js";
import FeaturedContents from "../models/FeaturedContents.js";

const seedData = async (req, res) => {
    await User.deleteMany();
    await Content.deleteMany();
    await FeaturedContents.deleteMany();

    const users = User.insertMany(data.users);
    const content = Content.insertMany(data.content);

    const getFeaturedContents1 = await featuredContentsCreateData(listMovieNames, "Movies");
    const getFeaturedContents2 = await featuredContentsCreateData(listSeriesNames, "Series");
    const getFeaturedContents3 = await featuredContentsCreateData(genres, "Movies");
    const getFeaturedContents4 = await featuredContentsCreateData(genres, "Series");
    const featuredContents = await FeaturedContents.insertMany([...getFeaturedContents1, ...getFeaturedContents2, ...getFeaturedContents3, ...getFeaturedContents4]);
    res.send({ users, content, featuredContents });
}

const featuredContentsCreateData = async(nameArray, contentType) => {
    // maybe change this without isSeries
    const isSeries = contentType === "Series" ? true : false;
    const res = [];

    for(let i = 0; i < nameArray.length; i++){
        const selectedContent = await Content.aggregate([
            {$match: {isSeries: isSeries}},
            {$sample: {size: 12}},
        ]);

        const contentToInsert = new FeaturedContents({
            name: nameArray[i],
            isSeries: isSeries, 
            genre: genres[i],
            contentList: selectedContent
        });
        res.push(contentToInsert);
    }
    return res;
}

export default seedData;