import Entry from '../models/Entry.js';

export const createEntry = async (req, res) => {
  try {
    const newEntry = new Entry({
      user: req.user.id,
      mood: req.body.mood,
      journal: req.body.journal
    });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { mood: req.body.mood, journal: req.body.journal },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const deleted = await Entry.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
