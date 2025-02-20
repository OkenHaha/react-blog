import mongoose from 'mongoose';

const streakSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  streak: {
    type: Number,
    required: true,
    default: 0,
  },
  lastUpdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
}); 

const Streak = mongoose.model('Streak', streakSchema);

export { Streak };