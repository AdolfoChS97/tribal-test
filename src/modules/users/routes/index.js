const express = require('express');
const app = express();

const UserControllerInstance = new (require('./../controllers/UserController'));

app.get('/login', async (req, res) => {
    await UserControllerInstance.loginUser(req, res);
});

app.post('/register', async(req, res) => {
    await UserControllerInstance.registerUser(req, res);
}); 

module.exports = app;