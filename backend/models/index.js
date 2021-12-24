const Sequelize = require('sequelize');
const config = require('../config/config');
const comment = require('./comment');
const hashtag = require('./hashtag');
const image = require('./image');
const post = require('./post');
const user = require('./user');

const env = process.env.NODE_ENV || 'development';
const conf = config[env];
const db = {};

const sequelize = new Sequelize(conf.database, conf.username, conf.password, conf);

db.Comment = comment(sequelize, Sequelize);
db.Hashtag = hashtag(sequelize, Sequelize);
db.Image = image(sequelize, Sequelize);
db.Post = post(sequelize, Sequelize);
db.User = user(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if(db[modelName].associate) {
    db[modelName].associate(db);
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
