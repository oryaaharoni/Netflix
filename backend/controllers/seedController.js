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
    const featuredContents = FeaturedContents.insertMany(getFeaturedContents1, getFeaturedContents2);
    res.send({ users, content, featuredContents });
}

const featuredContentsCreateData = async(nameArray, contentType) => {
    const isSeries = contentType === "Series" ? true : false;
    console.log('isSeries? ', isSeries)
    const res = [];

    for(let i = 0; i < nameArray.length; i++){
        console.log('name arrya:: ', nameArray[i])
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
        console.log('content to insert: ', contentToInsert)
        res.push(contentToInsert);
    }
    console.log('res::: ,', res)
    return res;
}

export default seedData;