const express = require('express');
const router = express.Router();
const {signup}=require('../controllers/userController')

router.use('/signup',signup);
