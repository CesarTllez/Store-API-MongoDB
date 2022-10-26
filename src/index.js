import app from './app.js';
import {} from 'dotenv/config';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
