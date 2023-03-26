const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL);

async function connect() {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
}

connect();

module.exports = { client };
