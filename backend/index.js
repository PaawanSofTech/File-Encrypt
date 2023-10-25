import express from "express";
// const express = require('express')
import dotenv from 'dotenv';
// const dotenv = require('dotenv')
import mongoose from "mongoose";
const app = express();
dotenv.config();
mongoose.connect('mongodb+srv://sinha_ankush:ankush_1234@cluster0.bh6n32m.mongodb.net/');
app.get('/', function(req,res){
    res.send('Hello world');
});

app.listen(4000, ()=>{
    console.log(`Server running at ${process.env.PORT}`)
});