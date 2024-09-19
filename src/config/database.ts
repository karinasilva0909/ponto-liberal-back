import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.NAME_DATABASE,
  dialect: 'mysql',
  username: process.env.USERNAME_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  host: process.env.HOST_DATABASE,
  models: [path.join(__dirname, '..', 'models')],  // Corrigindo o caminho para os modelos
  port: Number(process.env.PORT_DATABASE) || 57783,  // Usar variável de ambiente para a porta
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database & tables:', err);
  });

export default sequelize;
