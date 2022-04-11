import jwt from 'jsonwebtoken';
import prop from '../config/config';
const currentConfig = prop[process.env.NODE_ENV];

const { JWT_SECRET } = currentConfig;


const authUser = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(403).json({ message: 'Please login!' });
        const token = header,
            userData = jwt.verify(token, JWT_SECRET);

        req.userData = userData;

        next();
    } catch (error) {
        return res.status(403).json({ error: error });
    }
}

export { authUser }