import express from 'express';
import { PORT } from './config/env.js';
import SubscriptionRoute from './routes/subscription.rounte.js';
import AuthRoute from './routes/auth.route.js';
import UserRoute from './routes/user.route.js';
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from './model/middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';



const app = express();

// tell the app that we are going to use json

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// error middleware should be the last middleware
app.use(errorMiddleware);

app.use('/api/v1/subscription', SubscriptionRoute );
app.use('/api/v1/auth', AuthRoute );
app.use('/api/v1/users', UserRoute );

app.get('/', (req, res) =>
    res.send('Hello World!')
);

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDatabase();
});