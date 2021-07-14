require('dotenv').config()
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose'


require('./models/Product.js');
// import routes
const authRoutes = require('./routes/auth.ts');
const api = require('./routes/api.ts');


//mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
mongoose.connect(`${process.env.DB_CONNECTION}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
})

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/api', api);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Your port is ${port}`);
});











