import mongoose from 'mongoose';

const egoSchema = new mongoose.Schema({
  sinnerId: { type: String, required: true }, // e.g. "yi_sang"
  name: { type: String, required: true }, // e.g. "Crow's Eye View"
  riskLevel: { type: String, enum: ['ZAYIN', 'TETH', 'HE', 'WAW', 'ALEPH'], required: true },
  cost: {
    Wrath: { type: Number, default: 0 },
    Lust: { type: Number, default: 0 },
    Sloth: { type: Number, default: 0 },
    Gluttony: { type: Number, default: 0 },
    Gloom: { type: Number, default: 0 },
    Pride: { type: Number, default: 0 },
    Envy: { type: Number, default: 0 }
  },
  sanityCost: { type: Number, default: 0 },
  damageType: { type: String, enum: ['Slash', 'Pierce', 'Blunt'], required: true },
  affinity: { type: String, required: true } // Main sin affinity of the attack
}, { timestamps: true });

const Ego = mongoose.model('Ego', egoSchema);
export default Ego;
