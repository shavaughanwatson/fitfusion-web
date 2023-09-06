const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmark');
const cors = require('cors'); // Import the cors package

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/bookmark', bookmarkRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
