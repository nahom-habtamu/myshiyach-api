const express = require('express');
const cors = require('cors');
const app = express();

const connect = require('./utils/connectToMongo');
// const scheduleRefresherJob = require('./utils/refresherJob');

const users = require('./routes/users');
const mainCategories = require('./routes/mainCategories');
const admins = require('./routes/admins');
const subCategories = require('./routes/subCategories');
const products = require('./routes/products');
const cities = require('./routes/cities');
const auth = require('./routes/auth');
const upload = require('./routes/upload');

app.use(cors());
app.use(express.json());
app.use('/users', users);
app.use('/mainCategories', mainCategories);
app.use('/admins', admins);
app.use('/subCategories', subCategories);
app.use('/products', products);
app.use('/cities', cities);
app.use('/auth', auth);
app.use('/upload', upload);

app.use('/uploads', express.static('uploads'));

// scheduleRefresherJob();

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, async () => {
    console.info(`App Running on Port ${PORT}`)
    connect("Ecommerce");
});