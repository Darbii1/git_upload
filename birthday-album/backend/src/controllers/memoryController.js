import Memory from '../models/Memory.js';
import Album from '../models/Album.js';

export const createMemory = async (req, res) => {
  try {
    const { albumId, type, title, description, imageUrl, textContent } = req.body;

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    if (album.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const memory = new Memory({
      albumId,
      userId: req.user.id,
      type,
      title,
      description,
      imageUrl,
      textContent,
    });

    await memory.save();
    album.memories.push(memory._id);
    await album.save();

    res.status(201).json(memory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating memory', error: error.message });
  }
};

export const getMemoriesByAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const memories = await Memory.find({ albumId }).sort({ createdAt: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching memories', error: error.message });
  }
};

export const updateMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    if (memory.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(memory, req.body);
    memory.updatedAt = Date.now();
    await memory.save();

    res.json(memory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating memory', error: error.message });
  }
};

export const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    if (memory.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Album.findByIdAndUpdate(memory.albumId, {
      $pull: { memories: memory._id }
    });

    await Memory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Memory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting memory', error: error.message });
  }
};
