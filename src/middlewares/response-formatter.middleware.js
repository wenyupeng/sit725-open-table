const responseFormatter = (req, res, next) => {
  res.success = (data, message = "", metadata = {}) => {
    res.status(200).json({
      status: "success",
      ...(message?.length > 0 ? { message } : {}),
      data,
      metadata: {
        ...metadata,
        timestamp: new Date(),
      },
    });
  };

  next();
};

module.exports = responseFormatter;
