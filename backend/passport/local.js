const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    userNameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    console.log('email: ', email , 'password: ', password);
    try {
      const user = await User.findOne({
        where: { email }
      });

      if(!user) {
        done(null, false, { reason: '존재하지 않는 사용자입니다.'});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      passwordCompare ? done(null, user) : done(null, false, { reason: '비밀번호가 틀렸습니다.'});
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }));
};
