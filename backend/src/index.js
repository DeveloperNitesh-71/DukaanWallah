const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables immediately
dotenv.config();

// Connect to Database
connectDB();

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

/**
 * Global Middlewares
 */
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' })); // Body parser for JSON with higher limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Body parser for URL-encoded forms with higher limit
app.use(cookieParser()); // Parser for cookies

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/cart', cartRoutes);

/**
 * Root Route
 */
app.get('/', (req, res) => {
  res.status(200).send('DukaanWaala API is running smoothly...');
});

/**
 * 404 Handler
 */
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || (typeof err === 'string' ? err : 'Unknown Error');
  
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Server is running
});
