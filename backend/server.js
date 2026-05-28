import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import Sinner from './models/Sinner.js';
import Identity from './models/Identity.js';
import Ego from './models/Ego.js';
import Team from './models/Team.js';
import { sinnersData, identitiesData, egosData } from './db/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/limbus_teams';

// Middleware
app.use(cors());
app.use(express.json());

// Database connection & Server start
async function startServer() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    // Auto-seed database if empty
    const sinnerCount = await Sinner.countDocuments();
    if (sinnerCount === 0) {
      console.log('Database is empty. Triggering automatic database seeding...');
      // Run seed script dynamically
      await seedDatabaseOnStartup();
    }

    app.listen(PORT, () => {
      console.log(`Backend Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend server:', error);
    process.exit(1);
  }
}

// REST API Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Get all Sinners
app.get('/api/sinners', async (req, res) => {
  try {
    const sinners = await Sinner.find().sort({ code: 1 });
    res.json(sinners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Identities (optional filter by sinnerId)
app.get('/api/identities', async (req, res) => {
  try {
    const { sinnerId } = req.query;
    const filter = sinnerId ? { sinnerId } : {};
    const identities = await Identity.find(filter).sort({ rarity: -1, name: 1 });
    res.json(identities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all E.G.Os (optional filter by sinnerId)
app.get('/api/egos', async (req, res) => {
  try {
    const { sinnerId } = req.query;
    const filter = sinnerId ? { sinnerId } : {};
    const egos = await Ego.find(filter).sort({ riskLevel: 1, name: 1 });
    res.json(egos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all saved teams (fully populated)
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('slots.identityId')
      .populate('slots.egoIds')
      .sort({ updatedAt: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save a new team or update an existing team
app.post('/api/teams', async (req, res) => {
  try {
    const { name, description, slots } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }

    // Parse and validate slots to map references correctly
    const cleanSlots = slots.map(slot => ({
      sinnerId: slot.sinnerId,
      identityId: slot.identityId || null,
      egoIds: slot.egoIds || []
    }));

    // Find and update if name exists, otherwise create
    const team = await Team.findOneAndUpdate(
      { name },
      { name, description, slots: cleanSlots },
      { new: true, upsert: true, runValidators: true }
    );

    const populatedTeam = await Team.findById(team._id)
      .populate('slots.identityId')
      .populate('slots.egoIds');

    res.status(201).json(populatedTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a saved team
app.delete('/api/teams/:id', async (req, res) => {
  try {
    const result = await Team.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully', deletedId: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manual database seeding endpoint
app.post('/api/seed', async (req, res) => {
  try {
    await seedDatabaseOnStartup();
    res.json({ message: 'Database successfully seeded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper for dynamic startup seeding
async function seedDatabaseOnStartup() {
  try {
    console.log('Seeding database with default Limbus Company data...');
    
    // Clear collections first
    await Sinner.deleteMany({});
    await Identity.deleteMany({});
    await Ego.deleteMany({});
    await Team.deleteMany({});

    // Seed
    const insertedSinners = await Sinner.insertMany(sinnersData);
    const insertedIdentities = await Identity.insertMany(identitiesData);
    const insertedEgos = await Ego.insertMany(egosData);

    // Create default LCB Team
    const defaultTeamSlots = sinnersData.slice(0, 6).map(sinner => {
      const baseId = insertedIdentities.find(id => id.sinnerId === sinner.id && id.rarity === 1);
      const baseEgo = insertedEgos.find(ego => ego.sinnerId === sinner.id && ego.riskLevel === 'ZAYIN');

      return {
        sinnerId: sinner.id,
        identityId: baseId ? baseId._id : null,
        egoIds: baseEgo ? [baseEgo._id] : []
      };
    });

    await Team.create({
      name: 'Default LCB Team',
      description: 'The starting team of LCB Sinners with their default ZAYIN E.G.Os.',
      slots: defaultTeamSlots
    });

    console.log('Database auto-seeded successfully!');
  } catch (error) {
    console.error('Error during database auto-seeding:', error);
    throw error;
  }
}

startServer();
