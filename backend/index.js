// index.js
//import express from 'express';
//import mongoose from 'mongoose';
//import cors from 'cors';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//import dotenv from 'dotenv';
//import { fileURLToPath } from 'url';
//import { dirname } from 'path';
//import path from 'path';

// ✅ __dirname for ES Modules
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

// ✅ Load .env from ROOT folder
//dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
//const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
const MONGO_URI = process.env.MONGO_URI || `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

// Middleware;
// Enable CORS for all origins OR restrict to your frontend
app.use(cors({
  origin: '*', // For development, allow all. Later replace with your frontend URL.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Simple Logger (only in development)
if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// MongoDB Connect
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Schema
const itemSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

// Routes
// Get all items
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Create new item
app.post('/api/items', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newItem = new Item({ firstName, lastName, email });
  await newItem.save();
  res.json(newItem);
});

// Update item
app.put('/api/items/:id', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, email },
    { new: true }
  );
  res.json(updatedItem);
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
