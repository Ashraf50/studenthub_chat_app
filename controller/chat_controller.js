const chatService = require("../services/chat_service");

const getUserChats = async (req, res) => {
    try {
        const chats = await chatService.getUserChats(req.params.userId);
        res.status(200).json({ status: "true", chats });
    } catch (error) {
        res.status(500).json({ status: "false", message: "Failed to fetch chats" });
    }
};

const deleteChat = async (req, res) => {
    const { chatId } = req.params;
    try {
        const deletedChat = await chatService.deleteChatById(chatId);
        if (!deletedChat) {
            return res.status(404).json({ status: "false", message: 'chat not found' });
        }
        res.status(200).json({ status: "true", message: 'chat deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "false", message: 'Failed to delete chat' });
    }
};

module.exports = { getUserChats , deleteChat};
