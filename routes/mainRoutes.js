const express = require('express');
const router = express.Router();
const login = require('./login')
console.log('Main routes loaded');
router.use('/user',login);
module.exports=router;
