import mongoose from 'mongoose';

const connection = {}; // Holds the connection state

async function connect() {
  if (connection.isConnected) {
    // If already connected, return
    return;
  }

  try {
    // Try to connect to MongoDB
    const db = await mongoose.connect('mongodb+srv://mahak:mahak@cluster0.1mhgzzg.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Set connection status
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    // Handle connection errors
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to MongoDB");
  }
}

export default connect;
