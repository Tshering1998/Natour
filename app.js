const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//upaloding the static file
//FIRST MIDDLEWARE
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});
//Routes handler

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', postTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// handling the route which is not specified
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fails',
    message: `cant find ${req.originalUrl} on this sever`,
  });
  next();
});

module.exports = app;
