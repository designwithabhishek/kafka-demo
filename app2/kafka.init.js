const kafka = require("kafka-node");
const { client: mongoClient } = require("./mongo.init");

const client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
});

const consumer = new kafka.Consumer(
  client,
  [
    {
      topic: process.env.KAFKA_TOPIC,
    },
  ],
  {
    autoCommit: false,
  }
);

consumer.on("ready", function () {
  console.log("Consumer is ready");
});

consumer.on("message", async function (message) {
  console.log(message);
  const body = JSON.parse(message.value);
  const db = mongoClient.db("app2");
  const insertedDoc = await db.collection("posts").insertOne(body);
  console.log("Inserted Doc", insertedDoc);
});

module.exports = {
  consumer,
};
