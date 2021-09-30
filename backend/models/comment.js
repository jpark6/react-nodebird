const commentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // DB에는 comments 테이블 생성됨.
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Comment.associate = (db) => {};
  return Comment;
}

export default commentModel;
