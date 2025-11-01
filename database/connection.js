import mongoose from 'mongoose';

// Load dotenv only in development mode
let dotenvLoaded = false;
const loadDotenv = async () => {
  if (!dotenvLoaded && process.env.NODE_ENV !== 'production') {
    try {
      const dotenv = await import('dotenv');
      dotenv.config();
      dotenvLoaded = true;
    } catch (error) {
      // dotenv might not be installed, that's okay
      console.warn('⚠️ dotenv not available, using system environment variables');
    }
  }
};

let isConnected = false;

/**
 * Connect to MongoDB database
 * Reads connection URI from process.env.MONGODB_URI
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  // Load dotenv in development mode
  await loadDotenv();

  // If already connected, return early
  if (isConnected) {
    console.log('✅ MongoDB: Using existing connection');
    return;
  }

  // Get MongoDB URI from environment variable
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      // These options help with connection management
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    isConnected = mongoose.connection.readyState === 1;

    console.log('✅ MongoDB: Connected successfully');

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB: Disconnected');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB: Reconnected');
      isConnected = true;
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    isConnected = false;
    throw error;
  }
};

/**
 * Disconnect from MongoDB database
 * @returns {Promise<void>}
 */
export const disconnectDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('✅ MongoDB: Disconnected');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
    throw error;
  }
};

/**
 * Get current connection status
 * @returns {boolean}
 */
export const getConnectionStatus = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

export default connectDB;

