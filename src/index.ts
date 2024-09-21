import express from 'express';
import sequelize from './config/database';
import UserPublicRoute from './routes/UserPublicsRoute';
import UserRoute from './routes/UserRoute';
import RoleRoute from './routes/RoleRoute';
import GenderRoute from './routes/GenderRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 57783;

app.use(express.json());

app.use('/users/public', UserPublicRoute);
app.use('/api', UserRoute);
app.use('/api', RoleRoute);
app.use('/genders', GenderRoute);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
