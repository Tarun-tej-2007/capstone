const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String,
           required: true },
    author: String,
    description: String,
    genre: String,
    level: String,
    coverImage: String,
    rating: { type: Number, 
              default: 0 },
    createdAt: { type: Date, 
                 default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
