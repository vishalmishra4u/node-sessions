var session = require('client-sessions');

module.exports = {
  handleSession : handleSession
};

function handleSession(req, res, next){
  if(req.session && req.session.user){
    User
      .findOne({ email : req.session.email },function(err, user){
        if(user){
          req.user = user;
          delete req.user.password;
          req.session.user = user;
          req.locals.user = user;
        }
        next();
      })
  }
  else{
    next();
  }
}
