const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "build")))

// Mongoose Authentication
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true 
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the App!",
  });
});

const studyRouter = require('./routes/study');
const participantsRouter = require('./routes/participants');

app.use('/study', studyRouter);
app.use('/participants', participantsRouter);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    errors: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(
      `Global error handler: ${JSON.stringify(
        err.stack
      )}`
    );
  }

  if (err.errors.length) {
    console.log(
      "[API][Global][Array] Error: ",
      err
    );
    const errorMessages = err.errors.map(
      (err) => err.message
    );
    return res.status(err.status || 500).json({
      errors: errorMessages,
    });
  } else {
    console.log(
      "[API][Global][Non Array] Error: ",
      err
    );
    return res.status(err.status || 500).json({
      errors: err,
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`*** Express server is listening on port ${port} ***`);
});