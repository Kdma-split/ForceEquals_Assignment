require('dotenv').config();
require('./dbConfig/db_Mongo');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser'); 

const app = express();

const cors_options = {
  origin: process.env.CLIENT_URL || '*',
  method: "PUT, PATCH, POST",
  credentials: true,
};

app.use(cors(cors_options));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/userAuth.route.js'));
app.use('/api/accounts', require('./routes/userAccount.route.js'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

