const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/events'


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database!'))
  .catch(err => console.error(err));
