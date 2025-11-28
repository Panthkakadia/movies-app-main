const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  year: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
  genres: [{ type: String, required: true }],
  rating: { type: Number, required: true, min: 0, max: 10 },
  poster: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Movie', movieSchema);
