const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, documentController.createDocument);
router.put("/:id", authMiddleware, documentController.updateDocument);
router.get("/:id", authMiddleware, documentController.getDocument);
router.delete("/:id", authMiddleware, documentController.deleteDocument);
router.post("/:id/comments", authMiddleware, documentController.addComment);
router.put("/:id/comments/:commentId/resolve", authMiddleware, documentController.resolveComment);
router.delete("/:id/comments/:commentId", authMiddleware, documentController.deleteComment);

module.exports = router;
