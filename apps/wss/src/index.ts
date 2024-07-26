import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 3001,
});

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.on("message", (data, isBinary) => {
    if (isBinary) {
      console.log("Binary message from client received.");
    } else {
      console.log(`Text message from client received: ${data}`);
    }
  });

  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log("✅ WebSocket Server listening on ws://localhost:3001");

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  wss.close();
});
