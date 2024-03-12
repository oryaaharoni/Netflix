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

    const moviesFeaturedContents = await featuredContentsCreateData(listMovieNames, "false");
    const seriesFeaturedContents = await featuredContentsCreateData(listSeriesNames, "true");
    
    // To add genres lists
    // const genresFeaturedContents = await featuredContentsCreateData(genres, "both", true);
    // const featuredContents = await FeaturedContents.insertMany([...moviesFeaturedContents, ...seriesFeaturedContents, ...genresFeaturedContents]);

    // Not include genres lists
    const featuredContents = await FeaturedContents.insertMany([...moviesFeaturedContents, ...seriesFeaturedContents]);
    res.send({ featuredContents });
}

const parseIsSeries = (isSeries) => {
    if (isSeries === "true") {
        return true;
    } else if (isSeries === "false") {
        return false;
    } else {
        return null;
    }
};

const featuredContentsCreateData = async (nameArray, isSeries, genre = null) => {
    const res = [];

    for (let i = 0; i < nameArray.length; i++) {
        // console.log('name array: ', nameArray[i])
        let pipeline = [
            { $match: { isSeries: parseIsSeries(isSeries) } },
            // { $sample: { size: 6 } },
        ];

        if (isSeries !== "both") {
            pipeline.unshift({ $match: { isSeries: parseIsSeries(isSeries) } });
            if(nameArray[i] === "Top picks for Movie" || nameArray[i] === "Movies for your friend Steve"){
                console.log('genre: ', genre)
            }
            if (genre) {
                pipeline.$match.genre = nameArray[i];
            }
            // console.log('pipeline: ', pipeline)
        } else if (genre) {
            pipeline.unshift({ $match: { genre: nameArray[i] } });
        }
        
        // if(nameArray[i] === "Top picks for Movie" || nameArray[i] === "Movies for your friend Steve"){
            console.log('pipelineforrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr: ',  nameArray[i])
            console.log('pipeline: ', pipeline)
        // }

        const selectedContent = await Content.aggregate(pipeline);

        console.log('selected Content: ', selectedContent[0])

        // if(nameArray[i] === "Top picks for Movie" || nameArray[i] === "Movies for your friend Steve"){
        //     console.log('selected Content Forrrrrr: ', nameArray[i])
        //     console.log('selected Content: ', selectedContent)

        // }
        const contentToInsert = new FeaturedContents({
            name: nameArray[i],
            contentList: selectedContent,
        });

        // if (contentToInsert.contentList.length !== 0) {
            res.push(contentToInsert);
        // }
        // else{
        //     console.log('in the else for ::: ', nameArray[i])
        // }
        console.log('///////////////////////////////////////////////////////////////////////')
    }
    // console.log('res: ', res);
    return res;
};

export default seedData;