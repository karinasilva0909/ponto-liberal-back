import express from 'express';
import sequelize from './config/database';
import UserPublicRoute from './routes/UserPublicsRoute';
import UserRoute from './routes/UserRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3301;

app.use(express.json());

app.use('/api/public', UserPublicRoute);
app.use('/api', UserRoute);

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
