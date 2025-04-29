import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";
const hostname = process.env.NEXT_PUBLIC_HOST_NAME || "localhost";
const port = parseInt(process.env.NEXT_PUBLIC_PORT || "3001", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    io.on("connection", (socket) => {
        console.log("user connected : ", socket.id);

        socket.on("join-room", (room, username) => {
            socket.join(room);
            console.log(`User ${username} joined room ${room}`);
            socket.to(room).emit("user_joined", `${username} joined room ${room}`);
        });

        socket.on("chat_message", (room, message, sender) => {
            console.log(`Message from ${sender} in room ${room} : ${message}`);
            socket.to(room).emit("chat_message", { sender, message });
        });

        socket.on("disconnect", (scket) => {
            console.log(`user disconnected with id : ${socket.id}`);
        });
    });

    httpServer.listen(port, () => {
        console.log(`server is listen on http://${hostname}:${port}`);
    });
});
