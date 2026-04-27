import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId); // personal room
  });

  socket.on("sendMessage", async (data) => {
    const { sender, receiver, content } = data;

    // save to DB
    const message = await Message.create(data);

    // emit to receiver
    io.to(receiver).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
