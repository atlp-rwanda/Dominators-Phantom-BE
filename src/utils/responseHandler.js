const responseHandler = (res, code, record, req) => {
  const msg = code < 400 ? req.t('success') : 'fail';
  return res.status(code).json({ Message: msg, code, record });
};

export default responseHandler;
