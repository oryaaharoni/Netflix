import jwt from 'jsonwebtoken';

export const generateToken = ({ _id, username, email }) => {
    return jwt.sign({ _id: _id, username: username, email: email }, process.env.JWT_PW, { expiresIn: '7d' })
}

export const generatePWDToken = ( _id, email ,oldPassword) => {
    const secret= process.env.JWT_PW + oldPassword;
    return jwt.sign({ _id: _id, email: email }, secret, { expiresIn: '5m' })
}

export const isAuth = (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth) {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_PW, (error, decode) => {
            if (error) {
                res.status(401).send({ message: error.message })
            }
            else {
                req.user = decode;
                next();
            }
        })
    }
    else {
        res.status(401).send({ message: "Not authorized, no token" });
    }
}

