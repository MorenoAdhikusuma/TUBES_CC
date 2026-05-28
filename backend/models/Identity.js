import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  affinity: { type: String, required: true }, // Wrath, Lust, Sloth, Gluttony, Gloom, Pride, Envy, Defense
  damageType: { type: String, required: true }, // Slash, Pierce, Blunt, Defense
  basePower: { type: Number, required: true },
  coinCount: { type: Number, required: true },
  coinPower: { type: Number, required: true }
});

const identitySchema = new mongoose.Schema({
  sinnerId: { type: String, required: true }, // e.g. "yi_sang"
  name: { type: String, required: true }, // e.g. "W Corp. L3 Cleanup Agent"
  rarity: { type: Number, required: true, min: 1, max: 3 }, // 1 = 0, 2 = 00, 3 = 000
  speedRange: { type: String, required: true }, // e.g. "3-7"
  hp: { type: Number, default: 0 },
  defense: { type: Number, default: 0 },
  resistances: {
    slash: { type: String, enum: ['Fatal', 'Normal', 'Ineffective'], default: 'Normal' },
    pierce: { type: String, enum: ['Fatal', 'Normal', 'Ineffective'], default: 'Normal' },
    blunt: { type: String, enum: ['Fatal', 'Normal', 'Ineffective'], default: 'Normal' }
  },
  skills: {
    s1: { type: skillSchema, required: true },
    s2: { type: skillSchema, required: true },
    s3: { type: skillSchema, required: true },
    defense: { type: skillSchema, required: true }
  }
}, { timestamps: true });

const Identity = mongoose.model('Identity', identitySchema);
export default Identity;
