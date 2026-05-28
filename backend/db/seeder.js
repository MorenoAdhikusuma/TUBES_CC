import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sinner from '../models/Sinner.js';
import Identity from '../models/Identity.js';
import Ego from '../models/Ego.js';
import Team from '../models/Team.js';
import { sinnersData, identitiesData, egosData } from './seedData.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/limbus_teams';

async function seed() {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(mongoUri);
    console.log('Database connected.');

    await Sinner.deleteMany({});
    await Identity.deleteMany({});
    await Ego.deleteMany({});
    await Team.deleteMany({});
    console.log('Existing collections cleared.');

    const insertedSinners = await Sinner.insertMany(sinnersData);
    console.log(`Seeded ${insertedSinners.length} Sinners.`);

    const insertedIdentities = await Identity.insertMany(identitiesData);
    console.log(`Seeded ${insertedIdentities.length} Identities.`);

    const insertedEgos = await Ego.insertMany(egosData);
    console.log(`Seeded ${insertedEgos.length} E.G.Os.`);

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
    console.log('Created Default LCB Team.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

seed();
