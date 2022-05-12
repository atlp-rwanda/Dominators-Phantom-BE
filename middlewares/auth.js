import jwt from 'jsonwebtoken';
import prop from '../config/config';
const currentConfig = prop[process.env.NODE_ENV];

const { JWT_SECRET } = currentConfig;


export const authUser = async (req, res, next) => {
    try {
        const header = req.headers.authorization.split(' ')[1];
        if (!header) return res.status(403).json({ message: 'Please login!' });
        const token = header,
            userData = jwt.verify(token, JWT_SECRET);

        req.userData = userData;

        next();
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};
