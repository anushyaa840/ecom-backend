const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const Product = require('./model/Product');

async function setPlaceholders() {
  try {
    await connectDB();
    const products = await Product.find();
    if (!products.length) {
      console.log('No products found');
      process.exit(0);
    }

    const ops = products.map((p, idx) => ({
      updateOne: {
        filter: { _id: p._id },
        update: { $set: { image: `https://via.placeholder.com/600x400?text=Product+${idx+1}` } }
      }
    }));

    const res = await Product.bulkWrite(ops);
    console.log('Updated', res.modifiedCount || res.nModified || 'items');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

setPlaceholders();
