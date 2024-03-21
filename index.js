import express from 'express';
import path from 'path';
import connectMongoDb from './connectMongoDB.js';

import cookieParser from 'cookie-parser';
import { restrictToLoggedInUserOnly, checkAuth } from './middleware/auth.js';

import urlRoute from './routes/urlRoute.js';
import URL from './model/urlModel.js';
import staticRouter from './routes/staticRouter.js';
import userRouter from './routes/user.js';

const app = express();
const PORT = 8000;

connectMongoDb(
  'mongodb+srv://sutharjay3635:eNV92NDIUA6Lpxc1@cluster0.a33jagn.mongodb.net/'
).then(() => {
  console.log('MongoDB connected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/url/:shortID', async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
});

app.use('/url', restrictToLoggedInUserOnly, urlRoute);
app.use('/user', userRouter);
app.use('/', checkAuth, staticRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
