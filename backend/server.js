const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri ? 'Loaded' : 'NOT FOUND');

const client = new MongoClient(uri, {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 60000,
  retryWrites: true,
  retryReads: true,
  authSource: 'admin',
});

let db;

async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    db = client.db('overpourd');
    console.log('✓ Connected to MongoDB Atlas');
    return true;
  } catch (error) {
    console.error('✗ Error connecting to MongoDB:', error.message);
    return false;
  }
}

// Routes
app.get('/cafes', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not initialized' });
    }
    const cafes = await db.collection('cafes').find({}).toArray();
    res.json(cafes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/cafes/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not initialized' });
    }
    const cafe = await db.collection('cafes').findOne({ id: parseInt(req.params.id) });
    if (cafe) {
      res.json(cafe);
    } else {
      res.status(404).json({ error: 'Cafe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/checkins', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not initialized' });
    }
    const checkins = await db.collection('checkins').find({}).toArray();
    res.json(checkins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/checkins', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not initialized' });
    }
    const newCheckin = req.body;
    const result = await db.collection('checkins').insertOne(newCheckin);
    res.status(201).json({ ...newCheckin, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/friends', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not initialized' });
    }
    const friends = await db.collection('friends').find({}).toArray();
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not initialized' });
    }
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/groups', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not initialized' });
    }
    const groups = await db.collection('groups').find({}).toArray();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/groups', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not initialized' });
    }
    const newGroup = req.body;
    const result = await db.collection('groups').insertOne(newGroup);
    res.status(201).json({ ...newGroup, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more routes as needed

async function startServer() {
  const connected = await connectDB();
  if (!connected) {
    console.error('Failed to connect to MongoDB. Server starting anyway (read-only).');
  }
  app.listen(port, () => {
    console.log(`✓ Server running on port ${port}`);
  });
}

startServer();