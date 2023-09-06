const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://FITshav92:GYM_drake98@cluster0.idujeih.mongodb.net/',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB connected!'));

module.exports = {
  secretKey: Math.random * 10000,
};

module.exports = mongoose;
