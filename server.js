const dotenv = require("dotenv");
const isDev = process.env.NODE_ENV !== "production";

const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

const next = require("next");
const routes = require("./routes");

const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

let urlMongo = process.env.DatabaseURL;

mongoose.set("useCreateIndex", true);
mongoose.connect(urlMongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const KeyValueService = require("./server/services/KeyValueService");
const KeyValueServiceInstance = new KeyValueService();

const KeyValueController = require("./server/controllers/KeyValueController");
const KeyValueInstance = new KeyValueController(KeyValueServiceInstance);

const express = require("express");

app.prepare().then(() => {
  const server = express();

  // server.use("/static", express.static("public"))

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/key/:key", KeyValueInstance.getValue);
  server.post("/key", KeyValueInstance.setValue);

  server.use(handler);

  server.listen(process.env.PORT);

  console.log(`Server started on port ${process.env.PORT}`);
});
