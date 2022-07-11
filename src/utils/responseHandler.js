const responseHandler = (res, code, record, req) => {
  const status = code < 400 ? 'success' : 'fail';
  return res
    .status(code)
    .json({ status, Message: status, message: status, code, record });
};

export default responseHandler;
