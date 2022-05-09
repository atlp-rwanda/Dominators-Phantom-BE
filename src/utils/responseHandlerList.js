import app from '../app';

const responseHandler = (res, code, message) => {
    const statusMsg = code < 400 ? 'ok' : 'fail';
    return res.status(code).json({ status: statusMsg, code, message });
}

export default responseHandler;