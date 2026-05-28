import mongoose from 'mongoose';

const teamSlotSchema = new mongoose.Schema({
  sinnerId: { type: String, required: true }, // e.g. "yi_sang"
  identityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity', default: null },
  egoIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ego' }]
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  slots: [teamSlotSchema]
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
export default Team;
