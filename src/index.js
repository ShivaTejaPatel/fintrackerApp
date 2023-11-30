// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exchangeRateService = require('./services/exchangeRateService');
const app = express();



// Fetch exchange rates every 1 hour (for example)
const fetchRatesPeriodically = () => {
  setInterval(async () => {
    try {
      const exchangeRates = await exchangeRateService.fetchExchangeRates();
      // Handle fetched rates, update database, trigger alerts, etc.
      console.log('Fetched exchange rates:', exchangeRates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error.message);
    }
  }, 3600000); // 1 hour in milliseconds
};

// Call the function to start periodic fetching
fetchRatesPeriodically();

// Connect to MongoDB (Assuming MongoDB is running locally)
mongoose.connect('mongodb://localhost/finztracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/users')); // Create a separate file for user routes
app.use('/api/alerts', require('./routes/alerts')); // Create a separate file for alert routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
