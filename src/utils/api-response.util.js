/**
 * @author Yupeng Wen
 * @date 11/12/2024
 * @status 1 success 0 fail
 * @description
 * http status:
 * 200 success
 * 400 params invalid
 * 401 unauthority
 * 404 resources not exist
 * 500 server error
 */
exports.successResponse = function (res, msg) {
  let data = {
    status: 1,
    message: msg,
    time: Date.now(),
  };
  return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
  let resData = {
    status: 1,
    message: msg,
    data: data,
    time: Date.now(),
  };

  console.log("WILL RESPONSE JSON: ", resData);
  return res.status(200).json(resData);
};

exports.notFoundResponse = function (res, msg) {
  let data = {
    status: 0,
    message: msg,
    time: Date.now(),
  };
  return res.status(404).json(data);
};

exports.unauthorizedResponse = function (res, msg) {
  let data = {
    status: 0,
    message: msg,
    time: Date.now(),
  };
  return res.status(401).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  let resData = {
    status: 0,
    message: msg,
    data: data,
    time: Date.now(),
  };
  return res.status(400).json(resData);
};

exports.ErrorResponse = function (res, msg) {
  let data = {
    status: 0,
    message: msg,
    time: Date.now(),
  };
  return res.status(500).json(data);
};
