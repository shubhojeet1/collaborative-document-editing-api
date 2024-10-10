const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createDocument", authMiddleware, documentController.createDocument);
router.put("/:id", authMiddleware, documentController.updateDocument);
router.get("/:id", authMiddleware, documentController.getDocument);
router.delete("/:id", authMiddleware, documentController.deleteDocument);
router.post("/:id/comments", authMiddleware, documentController.addComment);

module.exports = router;
