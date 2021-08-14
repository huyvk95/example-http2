const express = require("express");
const spdy = require("spdy");
const { cert, key } = require("./ssl");

const app = express();
const port = parseInt(process.env.PORT, 10);

app.get("*", (req, res) => {
  res.status(200).send("Hello world!");
});

const options = {
  // Private key
  key,

  // Fullchain file or cert file (prefer the former)
  cert,

  // **optional** SPDY-specific options
  spdy: {
    protocols: ["h2", "spdy/3.1", "http/1.1"],
    plain: false,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
    "x-forwarded-for": true,

    connection: {
      windowSize: 1024 * 1024, // Server's window size

      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
      autoSpdy31: false,
    },
  },
};

const server = spdy.createServer({ cert, key }, app);

server.listen(port, () => {
  console.log(`Server start on ${port}`);
});
