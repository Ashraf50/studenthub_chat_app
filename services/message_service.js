const Chat = require("../models/chat_model");
const Message = require("../models/message_model");
const { findOrCreateChat } = require("../services/chat_service");

const saveMessage = async (senderId, recipientId, message, timestamp) => {
    const chat = await findOrCreateChat(senderId, recipientId);
    const newMessage = new Message({ chatId: chat._id, senderId, message, timestamp });
    await newMessage.save();
    chat.lastMessage = message;
    chat.lastUpdated = timestamp;
    await chat.save();
    return newMessage;
};

const getMessagesBetweenUsers = async (user1Id, user2Id, limit, skip) => {
    try {
        const chat = await Chat.findOne({ users: { $all: [user1Id, user2Id] } });
        if (!chat) {
            return [];
        }
        return await Message.find({ chatId: chat._id })
            .sort({ timestamp: -1 })
            .limit(limit)
            .skip(skip)
    } catch (error) {
        throw error;
    }
};


const deleteMessageById = async (messageId) => {
    return await Message.findByIdAndDelete(messageId);
};

module.exports = { saveMessage, getMessagesBetweenUsers, deleteMessageById };
