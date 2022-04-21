const express = require('express');
const app = express();



const connect = require('./utils/connectToMongo');
const users = require('./routes/users');

app.use(express.json());
app.use('/api/users', users);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.info(`App Running on Port ${PORT}`)
    connect("Ecommerce");
});
