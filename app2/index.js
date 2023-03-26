const express = require("express");
require("./kafka.init");
require("./mongo.init");
const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
