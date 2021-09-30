const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // DB에는 users 테이블 생성됨.
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,

    },
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  User.associate = (db) => {};
  return User;
}

export default userModel;
