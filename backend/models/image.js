const imageModel = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', { // DB에는 images 테이블 생성됨.
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Image.associate = (db) => {};
  return Image;
}

export default imageModel;
