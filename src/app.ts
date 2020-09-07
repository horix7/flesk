import express from 'express';
import parser from 'body-parser'
import userRoutes from './api-routes/auth-routes'
import * as dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use("/api/v1/auth", userRoutes)

app.listen(port, err =>  err ? console.error(err) : console.log(`server is listening now on ${port}`));

   