const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');
const userRoutes = require('./modules/users/routes/index');

app.use(helmet());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.use([userRoutes]);

( async () => {

    await mongoose.connect('mongodb://localhost/tribal', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
} )();

app.listen(port, () => {
    console.log(`API listening on ${port}`);
});
  