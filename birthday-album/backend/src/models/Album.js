import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  celebrationName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  description: String,
  coverImage: String,
  memories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Memory'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Album', albumSchema);
