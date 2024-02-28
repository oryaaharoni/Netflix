import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generatePWDToken } from "../utils.js";
import jwt from 'jsonwebtoken';


//reset password by email
export const getResetLink = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email: email});
    console.log("user ", user)

    if (user) {
        console.log(user.password)
        const token = generatePWDToken(user._id, user.email, user.password);
        const link = `localhost:8080/api/v1/reset/${user._id}/${token}`;

        console.log("link: ",link)
        res.status(200).send(link);

        //sent to to email
    }
    else {
        res.status(404).send("email not found");
    }
   
};

// if we click on right link we get a redirect here
export const resetPassword= async (req, res) => {
    const { id, token } = req.params;
    try {
        const user = await User.findOne({_id: id});
        console.log("user ", user)

            const secret = process.env.JWT_PW + user.password;
            try{
                const verify = jwt.verify(token, secret);
                // res.status(200).send({message:"Verify"});
                // res.send("Verify");
                console.log("vvvvvvvvvvvvvvvvvvvvv")
                res.writeHead(302, {
                    'Location': 'http://localhost:5173/resetPwd'
                  });
                  res.end();
                console.log("lllllllllllll")
                // res.status(200).send({message:"Verify"});
            }
            catch(error){
                // res.status(401).send({message:"not Verify"});
                // res.send("not Verify");
            }
    } catch (error) {
        res.send({message: "user not found"});
    }
    

    

};
