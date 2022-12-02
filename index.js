import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoutes.js';
import UserRoute from './Routes/UserRoute.js';
import postRoute from './Routes/postRoute.js';


const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', postRoute);

const server =  process.env.PORT || 5000

const DATABASE = "mongodb+srv://" + process.env.MONGO_CLIENT + ":" + process.env.MONGO_PW + "@stack-overflow.ewc84ae.mongodb.net/socialmediaDB?retryWrites=true&w=majority"

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => app.listen(server, () => console.log("listening"))).
    catch((error) => console.log(error));