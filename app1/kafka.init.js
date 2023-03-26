const kafka = require("kafka-node");
const client = new kafka.KafkaClient({
  kafkaHost: [process.env.KAFKA_BOOTSTRAP_SERVERS][0],
});

const producer = new kafka.Producer(client);

producer.on("ready", function () {
  console.log("Producer is ready");
});

module.exports = {
  producer,
};
