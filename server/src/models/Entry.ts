import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    enum: ['Happy', 'Sad', 'Anxious', 'Excited', 'Angry', 'Neutral'],
    required: true,
  },
    moodColor: {
        type: String,
        required: true,
    },
  journal: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

export default mongoose.model('Entry', EntrySchema);


// Method	Route	Action
// POST	/api/entries	Create entry
// GET	/api/entries/user/:id	Get entries for user
// PUT	/api/entries/:id	Update entry
// DELETE	/api/entries/:id	Delete entry