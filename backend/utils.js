import jwt from 'jsonwebtoken';

export const generateToken = ({_id, username, email}) => {
    return jwt.sign({_id: _id, username: username, email: email}, process.env.JWT_PW, {expiresIn:'7d'})
} 