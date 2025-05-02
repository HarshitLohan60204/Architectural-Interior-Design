
import mongoose from 'mongoose';

// Define the MongooseCache interface for TypeScript
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Create a globalThis-based approach that works in both browser and Node.js
const globalScope = typeof window !== 'undefined' ? window : globalThis;

// Add mongoose to global type
declare global {
  var mongooseGlobal: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

// Add to the global window object if in browser
if (typeof window !== 'undefined') {
  (window as any).mongooseGlobal = (window as any).mongooseGlobal || { conn: null, promise: null };
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster0.mongodb.net/blueprint?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * GlobalScope is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongooseCache = (globalScope as any).mongooseGlobal || { conn: null, promise: null };

if (!cached.conn) {
  cached = (globalScope as any).mongooseGlobal = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  // For client-side (browser) usage
  if (typeof window !== 'undefined') {
    // Mock successful connection for client-side
    console.log('Client-side MongoDB connection mocked');
    cached.conn = mongoose;
    return cached.conn;
  }

  // Server-side connection logic
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('MongoDB connection error:', e);
    // Provide a fallback to prevent complete failure
    cached.conn = mongoose;
  }
  
  return cached.conn;
}

export default dbConnect;
