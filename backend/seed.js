const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDB() {
  try {
    await client.connect();
    const db = client.db('overpourd');

    const data = JSON.parse(fs.readFileSync('../src/data/db.json', 'utf8'));

    // Insert cafes
    if (data.cafes) {
      await db.collection('cafes').insertMany(data.cafes);
      console.log('Cafes inserted');
    }

    // Insert checkins
    if (data.checkins) {
      await db.collection('checkins').insertMany(data.checkins);
      console.log('Checkins inserted');
    }

    // Insert friends
    if (data.friends) {
      await db.collection('friends').insertMany(data.friends);
      console.log('Friends inserted');
    }

    // Insert users
    if (data.users) {
      await db.collection('users').insertMany(data.users);
      console.log('Users inserted');
    }

    // Insert groups
    if (data.groups) {
      await db.collection('groups').insertMany(data.groups);
      console.log('Groups inserted');
    }

    // Insert events
    if (data.events) {
      await db.collection('events').insertMany(data.events);
      console.log('Events inserted');
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDB();