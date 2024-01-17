//start the server
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB conneted');
  });

const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listing to the port ${port}...`);
});
