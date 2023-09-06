const Bookmark = require('../models/bookmark');

exports.getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBookmark = async (req, res) => {
  try {
    const { name, gifUrl } = req.body;

    const bookmark = new Bookmark({ name, gifUrl });
    await bookmark.save();
    res.json({
      name: bookmark.name,
      gifUrl: bookmark.gifUrl,
      message: 'Bookmark created successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bookmark' });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndRemove(req.params.id);
    if (!deletedBookmark) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Bookmark' });
  }
};
