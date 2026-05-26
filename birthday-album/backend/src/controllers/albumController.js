import Album from '../models/Album.js';

export const createAlbum = async (req, res) => {
  try {
    const { celebrationName, birthDate, description } = req.body;

    const album = new Album({
      userId: req.user.id,
      celebrationName,
      birthDate,
      description,
    });

    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ message: 'Error creating album', error: error.message });
  }
};

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find({ userId: req.user.id })
      .populate('memories')
      .sort({ createdAt: -1 });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums', error: error.message });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate({
      path: 'memories',
      options: { sort: { createdAt: -1 } }
    });

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    if (album.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(album);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching album', error: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    if (album.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(album, req.body);
    album.updatedAt = Date.now();
    await album.save();

    res.json(album);
  } catch (error) {
    res.status(500).json({ message: 'Error updating album', error: error.message });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    if (album.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting album', error: error.message });
  }
};
