import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'pontoliberal_site',
  dialect: 'mysql',
  username: 'pontoliberal_user',
  password: '{%W%dItPfapY',
  host: 'pontoliberal.online',
  models: [__dirname + '/../models'],
  port: 3306,
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
