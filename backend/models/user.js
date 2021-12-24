module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // MariaDB users 테이블 생성
    email: {
      type: DataTypes.STRING(30),
      arrowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      arrowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      arrowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Hashtag);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', forignKey: 'followingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', forignKey: 'followerId' });
  };
  return User;
}