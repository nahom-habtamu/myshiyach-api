const express = require('express');
const cors = require('cors');
const app = express();

const connect = require('./utils/connectToMongo');

const users = require('./routes/users');
const mainCategories = require('./routes/mainCategories');
const admins = require('./routes/admins');
const subCategories = require('./routes/subCategories');
const products = require('./routes/products');
const cities = require('./routes/cities');
const auth = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/mainCategories', mainCategories);
app.use('/api/admins', admins);
app.use('/api/subCategories', subCategories);
app.use('/api/products', products);
app.use('/api/cities', cities);
app.use('/api/auth', auth);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.info(`App Running on Port ${PORT}`)
    connect("Ecommerce");
});