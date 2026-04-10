// Script to add coordinates to cafes in MongoDB
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Sample coordinates around Las Cruces, NM
const coordinates = [
  { lat: 32.3213, lng: -106.6348 }, // Downtown
  { lat: 32.2808, lng: -106.7667 }, // Midtown
  { lat: 32.2795, lng: -106.6803 }, // Uptown
  { lat: 32.3145, lng: -106.7234 }, // Arts District
  { lat: 32.2925, lng: -106.7089 }, // Residential
  { lat: 32.3389, lng: -106.6521 }, // Business District
];

async function addCoordinates() {
  try {
    await client.connect();
    const db = client.db('overpourd');
    const cafesCollection = db.collection('cafes');

    // Get all cafes
    const cafes = await cafesCollection.find({}).toArray();
    console.log(`Found ${cafes.length} cafes`);

    // Update each cafe with coordinates (cycling through the sample coordinates)
    for (let i = 0; i < cafes.length; i++) {
      const cafe = cafes[i];
      const coords = coordinates[i % coordinates.length];
      
      const result = await cafesCollection.updateOne(
        { _id: cafe._id },
        {
          $set: {
            lat: coords.lat,
            lng: coords.lng,
            latitude: coords.lat,
            longitude: coords.lng,
            address: cafe.location || cafe.address || 'Las Cruces, NM'
          }
        }
      );

      console.log(`✓ Updated cafe: ${cafe.name || 'Unknown'} with coords (${coords.lat}, ${coords.lng})`);
    }

    console.log('\n✓ All cafes updated with coordinates!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

addCoordinates();
