
module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { // MariaDB Hashtags 테이블 생성
    name: {
      type: DataTypes.STRING(20),
      arrowNull: true,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag', as: 'hashtagPost' });
  };
  return Hashtag;
}