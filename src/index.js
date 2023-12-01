
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/v1');


// Connect to MongoDB (Assuming MongoDB is running locally)
mongoose.connect('mongodb://127.0.0.1:27017/finztracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api',routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
