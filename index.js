const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const connectDB = require("./config/db");
const messageRoutes = require("./routes/message_route");
const chatRoutes = require("./routes/chat_route");
const messageService = require("./services/message_service");
const { join } = require("path");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

connectDB();

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
});
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatRoutes);

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (chatId) => {
        socket.join(chatId);
        console.log(`User ${chatId} joined the chat`);
    });

    socket.on("sendMessage", async (data) => {
        try {
            const { senderId, recipientId, message, timestamp } = data;
            const savedMessage = await messageService.saveMessage(
                senderId,
                recipientId,
                message,
                timestamp
            );
            io.to(savedMessage.chatId.toString()).emit("receiveMessage", savedMessage);
            console.log(`Message from ${senderId} to ${recipientId}: ${message}`);
        } catch (error) {
            console.error("Error sending message:", error.message);
        }
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
