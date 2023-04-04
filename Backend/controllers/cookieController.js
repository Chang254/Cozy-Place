const cookieController = {};

//Store user id in a cookie (useful for checking sessions & creating data tied to user id in the database)
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid',res.locals.user._id, {httpOnly: true});
  return next();
};

module.exports = cookieController;

