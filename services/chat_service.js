const Chat = require("../models/chat_model");
const Message = require("../models/message_model");

const findOrCreateChat = async (senderId, receiverId) => {
    let chat = await Chat.findOne({ users: { $all: [senderId, receiverId] } });
    if (!chat) {
        chat = new Chat({ users: [senderId, receiverId] });
        await chat.save();
    }
    return chat;
};

const getUserChats = async (userId) => {
    return await Chat.find({ users: userId }).sort({ lastUpdated: -1 });
};

const deleteChatById = async (chatId) => {
    const chat = await Chat.findById(chatId);
    if (!chat) return null;
    await Message.deleteMany({ chatId });
    return await Chat.findByIdAndDelete(chatId);
};

module.exports = { findOrCreateChat, getUserChats, deleteChatById };
