const express = require('express');
const app = express();

const connect = require('./utils/connectToMongo');
const users = require('./routes/users');
const mainCategories = require('./routes/mainCategories');

app.use(express.json());
app.use('/api/users', users);
app.use('/api/mainCategories', mainCategories);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.info(`App Running on Port ${PORT}`)
    connect("Ecommerce");
});
