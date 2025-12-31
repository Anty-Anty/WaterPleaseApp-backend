const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require("dotenv").config();

const usersRoutes = require('./routes/users-routes');
const mapsRoutes = require('./routes/maps-routes');
const plantsRoutes = require('./routes/plants-routes');
const HttpError = require('./models/http-error');

const app = express();

//JSON body-parsing middleware: (POST and PATCH wouldn't work without it)
app.use(bodyParser.json());

//ROUTES. (user route for future development)
// app.use('/api/users', usersRoutes);
app.use('/api/maps', mapsRoutes);
app.use('/api/plants', plantsRoutes);

app.use((req, res, next) => {
  return next(new HttpError('Could not find this route.', 404));
});

//error handling middleware, this func will execute if any middleware infront gives an error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// app.use((req, res, next) => {
//   res.send('hi');
// });

// app.listen(5000);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9dw6mwc.mongodb.net/?appName=Cluster0`,
  {
    dbName: process.env.DB_NAME
  }
) 

  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });

  //confirm that connection to database works:
//   mongoose.connection.once("open", () => {
//   console.log("Connected to DB:", mongoose.connection.name);
// });