const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const Product = require('./model/Product');

async function seed() {
  try {
    await connectDB();
    console.log('Clearing existing products...');
    await Product.deleteMany({});

    const products = [];
    for (let i = 1; i <= 20; i++) {
      products.push({
        name: `Sample Product ${i}`,
        description: `This is a seeded product number ${i}`,
        image: `http://localhost:${process.env.PORT || 5000}/uploads/product${i}.jpeg`,
        price: Math.floor(Math.random() * 100000) + 100,
        stock: Math.floor(Math.random() * 100) + 1,
        category: i % 2 === 0 ? 'electronics' : 'accessories'
      });
    }

    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
