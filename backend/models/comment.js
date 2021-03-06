
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // MariaDB comments 테이블 생성
    content: {
      type: DataTypes.TEXT,
      arrowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
}