import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoutes.js';
import UserRoute from './Routes/UserRoute.js';
import postRoute from './Routes/postRoute.js';
import uploadRoute from './Routes/UploadRoute.js';


//routes

const app = express();

//to serve images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

//middlewares

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', postRoute);
app.use('/upload', uploadRoute);

const server =  process.env.PORT || 5000

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => app.listen(server, () => console.log("listening"))).
    catch((error) => console.log(error));