
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', { // MariaDB images 테이블 생성
    src: {
      type: DataTypes.STRING(200),
      arrowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
}