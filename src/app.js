import {} from './databases/mongo-connection.database.js';

//Modules
import express from 'express';
import cors from 'cors';

//Controllers
import productRouter from './controllers/product.controller.js';
import categoryRouter from './controllers/category.controller.js';
import roleRouter from './controllers/role.controller.js';
import userRouter from './controllers/user.controller.js';

//Error modules
import notFound from './middlewares/notFound.middleware.js';
import handleErrors from './middlewares/handleErrors.middleware.js';

//API
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home Page from NodeJS');
});

//Controller routers
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/users', userRouter);

//Error modules
app.use(notFound);
app.use(handleErrors);

export default app;
