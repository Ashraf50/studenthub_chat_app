const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    users: [{ type: String, ref: "User" }],
    lastMessage: { type: String, default: "" },
    lastUpdated: { type: Date, default: Date.now },
});

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
