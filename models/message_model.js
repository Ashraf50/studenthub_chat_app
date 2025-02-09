const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.ObjectId,
            ref: "Chat",
            required: [true, 'Chat ID is required']
        },
        senderId: {
            type: String,
            ref: "User",
            required: [true, 'Sender ID is required']
        },
        message: {
            type: String,
            required: [true, 'Message content is required']
        },
        timestamp: {
            type: Date,
            required :  [true, 'Message time is required']
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
