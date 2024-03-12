import User from "../models/User.js";
import Content from "../models/Content.js";
import { data, genres, listMovieNames, listSeriesNames } from "../data.js";
import FeaturedContents from "../models/FeaturedContents.js";

const seedData = async (req, res) => {
    await User.deleteMany();
    await Content.deleteMany();
    await FeaturedContents.deleteMany();

    const users = await User.insertMany(data.users);
    const content = await Content.insertMany(data.content);

    const moviesFeaturedContents = await featuredContentsCreateData(listMovieNames, false);
    const seriesFeaturedContents = await featuredContentsCreateData(listSeriesNames, true);

    // To add genres lists
    // const genresFeaturedContents = await featuredContentsCreateData(genres);
    // const featuredContents = await FeaturedContents.insertMany([...moviesFeaturedContents, ...seriesFeaturedContents, ...genresFeaturedContents]);

    // Not include genres lists
    const featuredContents = await FeaturedContents.insertMany([...moviesFeaturedContents, ...seriesFeaturedContents]);
    res.send({ users, content, featuredContents });
}

const featuredContentsCreateData = async (nameArray, isSeries = null) => {
    const res = [];

    for (let i = 0; i < nameArray.length; i++) {
        let pipeline = [
            { $match: { isSeries: isSeries } },
            { $sample: { size: 15 } },
        ];

        if (isSeries === null) {
            pipeline = [
                { $match: { genre: nameArray[i] } },
                { $sample: { size: 15 } },
            ]
        }

        const selectedContent = await Content.aggregate(pipeline);

        const contentToInsert = new FeaturedContents({
            name: nameArray[i],
            isSeries: isSeries,
            contentList: selectedContent,
        });

        if (contentToInsert.contentList.length !== 0) {
            res.push(contentToInsert);
        }
    }
    return res;
};

export default seedData;