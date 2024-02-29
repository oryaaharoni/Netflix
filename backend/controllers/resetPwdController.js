import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generatePWDToken } from "../utils.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

//reset password by email
export const getResetLink = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user ", user)

    if (user) {
        console.log(user.password)
        const token = generatePWDToken(user._id, user.email, user.password);
        const link = `localhost:8080/api/v1/reset/${user._id}/${token}`;

        // add current email and check if we recive the mail link
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'adarsh438tcsckandivali@gmail.com',
              pass: 'rmdklolcsmswvyfw'
            }
          });
          
          var mailOptions = {
            from: 'adarsh438tcsckandivali@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: link
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } 
            else {
              console.log('Email sent: ' + info.response);
            }
          });

        console.log("link: ", link)
        res.status(200).send(link);
            //add here alert
            //sent to to email
    }
    else {
        res.status(404).send("email not found");
    }

};

export const resetPassword = async (req, res) => {
    const { id, token } = req.params;

    try {
        const user = await User.findOne({ _id: id });
        const secret = process.env.JWT_PW + user.password;

        try {
            const verify = jwt.verify(token, secret);

            // Redirect to the frontend ResetPwdPage with the user ID in the URL need to be changed
            res.redirect(302, `http://localhost:5173/resetPwd?id=${id}&token=${token}`);
        } catch (error) {
            res.status(401).send("Invalid token");
        }
    } catch (error) {
        res.status(404).send("User not found");
    }
};

export const getNewPassword = async (req, res) => {
    const { password, id, token } = req.body;
    console.log('in new password')
    console.log('password ', password)
    console.log('id: ',id)
    console.log('token: ', token)
    try {
        const user = await User.findOne({ _id: id });
        console.log('in try')
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        const secret = process.env.JWT_PW + user.password;
        try {
            console.log('in second try')
            jwt.verify(token, secret);
        } catch (error) {
            console.log('in catch invalid token')
            return res.status(401).send({ message: 'Invalid token' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            { _id: id },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        console.log('password saveeeeeeeeeeeed')

        res.status(200).send({ redirectUrl: 'http://localhost:5173/signIn' });
    } catch (error) {
        console.error('Error in getNewPassword:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};