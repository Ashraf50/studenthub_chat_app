const messageService = require('../services/message_service');
const mongoose = require('mongoose');

const sendMessage = async (req, res) => {
    const { senderId, recipientId, message, timestamp } = req.body;
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recipientId)) {
        return res.status(400).json({ status: "false", message: 'Invalid user IDs' });
    }
    try {
        const newMessage = await messageService.saveMessage(senderId, recipientId, message, timestamp);
        return res.status(201).json({ status: "true", message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "false", message: 'Failed to send message' });
    }
};

const getMessages = async (req, res) => {
    const { user1Id, user2Id } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    if (!user1Id || !user2Id) {
        return res.status(400).json({ status: "false", message: 'Both user1Id and user2Id are required' });
    }
    if (!mongoose.Types.ObjectId.isValid(user1Id) || !mongoose.Types.ObjectId.isValid(user2Id)) {
        return res.status(400).json({ status: "false", message: 'Invalid user IDs' });
    }
    try {
        const messages = await messageService.getMessagesBetweenUsers(user1Id, user2Id, limit, skip);
        if (messages.length === 0) {
            return res.status(200).json({ status: "true", message: "No messages found", messages: [] });
        }
        return res.status(200).json({ status: "true", message: 'Fetched messages successfully', messages, page, limit });
    } catch (error) {
        return res.status(500).json({ status: "false", message: 'Failed to fetch messages', error: error.message });
    }
};


const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    try {
        const deletedMessage = await messageService.deleteMessageById(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ status: "false", message: 'Message not found' });
        }
        res.status(200).json({ status: "true", message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "false", message: 'Failed to delete message' });
    }
};

module.exports = { sendMessage, getMessages, deleteMessage };
