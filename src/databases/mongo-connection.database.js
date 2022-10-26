import mongoose from 'mongoose';
import {} from 'dotenv/config';

const connectionString = process.env.MONGO_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => console.log(err));

process.on('uncaughtException', () => {
  mongoose.connection.close();
});
