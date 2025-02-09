const { findOrCreateChat } = require("../services/chat_service");

let getChatId = ("/getChatId", async (req, res) => {
    const { user1Id, user2Id } = req.query;
    if (!user1Id || !user2Id) {
        return res.status(400).json({ status: "false", message: "user1Id and user2Id are required" });
    }
    try {
        const chat = await findOrCreateChat(user1Id, user2Id);
        return res.status(200).json({ status: "true", chatId: chat._id });
    } catch (error) {
        console.error("Error getting chat ID:", error);
        return res.status(500).json({ status: "false", message: "Failed to get chat ID" });
    }
});

module.exports = getChatId;
