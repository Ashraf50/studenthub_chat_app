const express = require('express');
const router = express.Router();
const messageController = require('../controller/message_controller');
const apiKeyMiddleware = require('../middleware/apiKey')

router.route('/')
    .get(apiKeyMiddleware, messageController.getMessages)
    .post(apiKeyMiddleware, messageController.sendMessage);
router.delete('/:messageId', apiKeyMiddleware, messageController.deleteMessage);
module.exports = router;