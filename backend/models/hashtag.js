const hashtagModel = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { // DB에는 hashtags 테이블 생성됨.
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Hashtag.associate = (db) => {};
  return Hashtag;
}

export default hashtagModel;
