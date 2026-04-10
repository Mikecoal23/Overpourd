const { MongoClient } = require('mongodb');
require('dotenv').config();

(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('overpourd');
    const updates = [
      { id: 1, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80' },
      { id: 2, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80' },
      { id: 3, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80' },
      { id: 4, image: 'https://images.unsplash.com/photo-1497294815431-9365093b7331?auto=format&fit=crop&w=1000&q=80' },
      { id: 5, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
      { id: 6, image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80' }
    ];
    for (const update of updates) {
      await db.collection('cafes').updateOne({ id: update.id }, { $set: { image: update.image } });
    }
    console.log('Updated cafe image URLs in MongoDB');
    const cafes = await db.collection('cafes').find({}).toArray();
    cafes.forEach(cafe => console.log(`${cafe.id}: ${cafe.name} -> ${cafe.image}`));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
})();
