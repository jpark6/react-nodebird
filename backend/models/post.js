const postModel = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // DB에는 posts 테이블 생성됨.
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {};
  return Post;
}

export default postModel;
