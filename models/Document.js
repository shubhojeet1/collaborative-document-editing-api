const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  versionHistory: [
    {
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});


documentSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    this.versionHistory.push({ content: this.content });
  }
  next();
});

module.exports = mongoose.model('Document', documentSchema);
