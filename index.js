const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Working Perfectly");
});

app.listen(5000, () => {
    console.info("App Running on Port 5000")
});

