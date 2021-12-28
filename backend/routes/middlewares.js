exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('need login')
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Can access when not logged in')
  }
};