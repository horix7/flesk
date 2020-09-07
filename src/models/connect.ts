import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

dotenv.config();
mongoose.connect( process.env.MONGODBURL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("we are connected !!!!")
});

export default db