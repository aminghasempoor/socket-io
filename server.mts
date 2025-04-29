import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";
const hostname = process.env.NEXT_PUBLIC_HOST_NAME || "localhost";
const port = parseInt(process.env.NEXT_PUBLIC_PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    io.on("connection", (socket) => {
        console.log("user connected : ", socket.id);
    });
    httpServer.listen(port, () => {
        console.log(`server is listen on http://${hostname}:${port}`);
    });
});
