import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generatePWDToken } from "../utils.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

//reset password by email
export const getResetLink = async (req, res) => {
    const { email, frontendHost, frontendNavigate } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
        const token = generatePWDToken(user._id, user.email, user.password);

        // const host = req.get('host'); //host is localhost:8080
        //frontendHost //the frontend host, here is http://localhost:5173
        // const protocol = req.protocol; //protocol is http/https

        const link = `${frontendHost}/${frontendNavigate}?id=${user._id}&token=${token}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PWD_EMAIL
            },
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: 'Copy this link to youre URL and reset your password: ' + link
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).send(link);
    }
    else {
        res.status(404).send("email not found");
    }

};

export const getNewPassword = async (req, res) => {
    const { id, password, token, frontendHost, frontendNavigate } = req.body;
    
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const secret = process.env.JWT_PW + user.password;
        try {
            jwt.verify(token, secret);
        } catch (error) {
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
        console.log('Password Saved Successfully')

        res.status(200).send({ redirectUrl: `${frontendHost}/${frontendNavigate}` });

    } catch (error) {
        console.error('Error in getNewPassword:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};