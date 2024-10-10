const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
  const { title, content } = req.body;

  const newDocument = new Document({
    title,
    content,
  });

  try {
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateDocument = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      id,
      { title, content, $push: { versionHistory: { content } } },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }


    req.app.get('io').emit('documentUpdated', updatedDocument);

    res.json(updatedDocument);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getDocument = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteDocument = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDocument = await Document.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
  
    try {
      const document = await Document.findById(id);
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }
  

      document.comments.push({
        userId: req.user.id,
        text,
      });
  
      await document.save();
      res.status(201).json(document);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  