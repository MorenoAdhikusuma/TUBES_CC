import mongoose from 'mongoose';

const sinnerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g. "yi_sang", "faust"
  name: { type: String, required: true }, // e.g. "Yi Sang", "Faust"
  code: { type: Number, required: true }, // 1 to 12
}, { timestamps: true });

const Sinner = mongoose.model('Sinner', sinnerSchema);
export default Sinner;
