import express from 'express';
import Entry from '../models/Entry.js';

const router = express.Router();

// Create new entry
router.post('/', async (req, res) => {
  try {
    const newEntry = await Entry.create(req.body);
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all entries for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an entry by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedEntry = await Entry.findByIdAndUpdate(
        req.params.id,
        {
          mood: req.body.mood,
          journal: req.body.journal,
        },
        { new: true } // return updated doc
      );
  
      if (!updatedEntry) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      res.json(updatedEntry);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete an entry by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
  
      if (!deletedEntry) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      res.json({ message: 'Entry deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;
