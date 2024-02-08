import User from "../models/User";
import bcrypt from "bcryptjs";

//connect to site
export const signin = async (req, res) => {
    const {email, password: passwordFromWebsite} = req.body;
    const user = await User.findOne({email: email});

    if (user) {
        if (bcrypt.compareSync(passwordFromWebsite,user.password)){
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user) 
            }); 
            return;
        }
    }
    res.status(401).send({message: 'Invalid Password/Email'});
}


//new user
export const signup = async (req, res) => {
    const {username, email, password} = req.body;

    const newUser = new User({
        username,
        email,
        password: bcrypt.hashSync(password)
    });

    const user = await newUser.save();

    res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user)
    });
};

