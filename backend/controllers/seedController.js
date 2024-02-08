import User from "../models/User.js";
import Content from "../models/Content.js";
import data from "../data.js";

const seedData = async(req,res) => {

    await User.deleteMany();
    await Content.deleteMany();

    const users = User.insertMany(data.users);
    const content = Content.insertMany(data.content);
    res.send({users, content});
}

export default seedData;