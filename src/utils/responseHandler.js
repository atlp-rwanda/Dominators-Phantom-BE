const responseHandler = (res, code, record) => {
    const msg = code < 400 ? 'success' : 'fail';
    return res.status(code).json({ status: msg, code, record });
}

export default responseHandler;