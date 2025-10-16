require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('strictQuery', true); // Suppress Mongoose strictQuery warning
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const listRoutes = require('./routes/listRoutes');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    // Seed admin user if not exists
    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const admin = new User({ email: adminEmail, password: hashedPassword, role: 'admin' });
      await admin.save();
      console.log('Admin user seeded');
    }
  })
  .catch(err => console.error('DB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));