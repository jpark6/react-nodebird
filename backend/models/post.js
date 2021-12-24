module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // MariaDB posts 테이블 생성
    content: {
      type: DataTypes.TEXT,
      arrowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, {through: 'hashtag'});
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.belongsTo(db.Post, { as: 'Retweet'});
  };
  return Post;
}