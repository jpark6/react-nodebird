import Sequelize from 'sequelize';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

console.log('config env: '. configEnv);

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, configEnv);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
