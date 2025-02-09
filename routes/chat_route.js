const express = require("express");
const getChatId = require("../middleware/get_chat_id");
const chatController = require("../controller/chat_controller");
const apiKeyMiddleware = require('../middleware/apiKey')
const router = express.Router();

router.get('/', getChatId);
router.get("/:userId", apiKeyMiddleware, chatController.getUserChats);
router.delete("/:chatId", apiKeyMiddleware, chatController.deleteChat);

module.exports = router;
