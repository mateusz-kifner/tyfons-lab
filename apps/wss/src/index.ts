import { WebSocketServer } from "ws";
import { validateWSSession } from "@tyfons-lab/auth/ws";

function err(message: string): never {
  throw Error(message);
}

const WSServerURL = new URL(
  process.env.EXPO_PUBLIC_WS_SERVER_URL ??
    err("EXPO_PUBLIC_WS_SERVER_URL not set"),
);

const host = WSServerURL.hostname;
const port = Number.parseInt(WSServerURL.port);

const wss = new WebSocketServer({ port, host });

wss.on("connection", async (ws, req) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
  if (!req.headers.cookie?.includes("auth_session")) {
    console.log("Unauthorized connection, cookie missing");
    ws.close();
    return;
  }
  const session = await validateWSSession(req);
  if (session.user === null) {
    console.log("Unauthorized connection, cookie invalid");
    ws.close();
    return;
  }
  console.log("Authorized connection", session);

  ws.on("message", (data, isBinary) => {
    if (isBinary) {
      console.log("Binary message from client received.");
    } else {
      console.log(`Text message from client received: ${data}`);
    }
  });
});
console.log(`✅ WebSocket Server listening on ${WSServerURL}`);

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  wss.close();
});
