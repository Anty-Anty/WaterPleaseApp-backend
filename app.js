const express = require("express");
const bodyParser = require("body-parser");

const usersRoutes = require('./routes/users-routes');
const mapsRoutes = require('./routes/maps-routes');
const plantsRoutes = require('./routes/plants-routes');
const HttpError = require ('./models/http-error');

const app = express();

//JSON body-parsing middleware: (POST and PATCH wouldn't work without it)
app.use(bodyParser.json());

//ROUTES. (user route for future development)
// app.use('/api/users', usersRoutes);
app.use('/api/maps', mapsRoutes);
app.use('/api/plants', plantsRoutes);

app.use((req,res,next)=>{
    return next(new HttpError('Could not find this route.', 404));
});

//error handling middleware, this func will execute if any middleware infront gives an error
app.use((error, req, res, next)=>{
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

// app.use((req, res, next) => {
//   res.send('hi');
// });

app.listen(5000);