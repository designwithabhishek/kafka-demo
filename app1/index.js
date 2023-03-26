const express = require("express");
const { producer } = require("./kafka.init");
const User = require("./postgres.init");
const app = express();
app.use(express.json());

app.post("/create-post", (req, res) => {
  const body = req.body;
  console.log(body);
  producer.send(
    [
      {
        topic: process.env.KAFKA_TOPIC,
        messages: JSON.stringify(req.body),
      },
    ],
    async (err, data) => {
      if (err) {
        console.log(err);
        res.send({ error: err });
      } else {
        console.log(data);
        await User.create(req.body);
        res.send(req.body);
      }
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
