const express = require('express');
const auth = require('./middlewares/auth');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

app.use('/', require('./routes/authRoutes'));
app.use('/books', require('./routes/bookRoutes'))
app.use('/reviews', require('./routes/reviewRoutes'))
app.use('/',require('./routes/publicRoutes'))
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
