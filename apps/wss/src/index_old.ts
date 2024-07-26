export const name = "wss";
import express from "express";
import WebSocket from "ws";
import crypto from "crypto";
import fs from "fs";
import { LIST_OF_NOUNS } from "./list_of_nouns";

const MAX_PEERS = 4096;
const MAX_LOBBIES = 1024;
const PORT = 9080;

const NO_LOBBY_TIMEOUT = 1000;
const SEAL_CLOSE_TIMEOUT = 10000;
const PING_INTERVAL = 10000;

const STR_NO_LOBBY = "Have not joined lobby yet";
const STR_HOST_DISCONNECTED = "Room host has disconnected";
const STR_ONLY_HOST_CAN_SEAL = "Only host can seal the lobby";
const STR_SEAL_COMPLETE = "Seal complete";
const STR_TOO_MANY_LOBBIES = "Too many lobbies open, disconnecting";
const STR_ALREADY_IN_LOBBY = "Already in a lobby";
const STR_LOBBY_DOES_NOT_EXISTS = "Lobby does not exists";
const STR_LOBBY_IS_SEALED = "Lobby is sealed";
const STR_INVALID_FORMAT = "Invalid message format";
const STR_NEED_LOBBY = "Invalid message when not in a lobby";
const STR_SERVER_ERROR = "Server error, lobby not found";
const STR_INVALID_DEST = "Invalid destination";
const STR_INVALID_CMD = "Invalid command";
const STR_TOO_MANY_PEERS = "Too many peers connected";
const STR_INVALID_TRANSFER_MODE = "Invalid transfer mode, must be text";
const STR_UNAUTHORIZED = "Unauthorized, JWT token not found";
const STR_AUTHORIZED = "Authorized, JWT token is correct";

function randomInt(low: number, high: number) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

function randomId() {
  return Math.abs(new Int32Array(crypto.randomBytes(4).buffer)[0] as number);
}

function randomSecret() {
  let out = `${
    LIST_OF_NOUNS[
      randomInt(0, LIST_OF_NOUNS.length - 1) as keyof typeof LIST_OF_NOUNS
    ]
  }#`;
  for (let i = 0; i < 4; i++) {
    out += String.fromCharCode(48 + randomInt(0, 9));
  }
  return out;
}

// function toEvent(message: string) {
//   try {
//     var event = JSON.parse(message);
//     this.emit(event.type, event.payload);
//   } catch (err) {
//     console.log("not an event", err);
//   }
// }

const app = express();
app.use(express.json());
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server: server });

class ProtoError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

// class Peer {
//   id: number;
//   constructor(id, ws) {
//     this.id = id;
//     this.ws = ws;
//     this.lobby = "";
//     // Close connection after 1 sec if client has not joined a lobby
//     this.timeout = setTimeout(() => {
//       if (!this.lobby) ws.close(4000, STR_NO_LOBBY);
//     }, NO_LOBBY_TIMEOUT);
//   }
// }

// class Lobby {
//   name: string;

//   constructor(name, host) {
//     this.name = name;
//     this.host = host;
//     this.peers = [];
//     this.sealed = false;
//     this.closeTimer = -1;
//   }
//   getPeerId(peer) {
//     if (this.host === peer.id) return 1;
//     return peer.id;
//   }
//   join(peer) {
//     const assigned = this.getPeerId(peer);
//     peer.ws.send(`I: ${assigned}\n`);
//     this.peers.forEach((p) => {
//       p.ws.send(`N: ${assigned}\n`);
//       peer.ws.send(`N: ${this.getPeerId(p)}\n`);
//     });
//     this.peers.push(peer);
//   }
//   leave(peer) {
//     const idx = this.peers.findIndex((p) => peer === p);
//     if (idx === -1) return false;
//     const assigned = this.getPeerId(peer);
//     const close = assigned === 1;
//     this.peers.forEach((p) => {
//       // Room host disconnected, must close.
//       if (close) p.ws.close(4000, STR_HOST_DISCONNECTED);
//       // Notify peer disconnect.
//       else p.ws.send(`D: ${assigned}\n`);
//     });
//     this.peers.splice(idx, 1);
//     if (close && this.closeTimer >= 0) {
//       // We are closing already.
//       clearTimeout(this.closeTimer);
//       this.closeTimer = -1;
//     }
//     return close;
//   }
//   seal(peer) {
//     // Only host can seal
//     if (peer.id !== this.host) {
//       throw new ProtoError(4000, STR_ONLY_HOST_CAN_SEAL);
//     }
//     this.sealed = true;
//     this.peers.forEach((p) => {
//       p.ws.send("S: \n");
//     });
//     console.log(
//       `Peer ${peer.id} sealed lobby ${this.name} ` +
//         `with ${this.peers.length} peers`,
//     );
//     this.closeTimer = setTimeout(() => {
//       // Close peer connection to host (and thus the lobby)
//       this.peers.forEach((p) => {
//         p.ws.close(1000, STR_SEAL_COMPLETE);
//       });
//     }, SEAL_CLOSE_TIMEOUT);
//   }
// }

// const lobbies = new Map();
let peersCount = 0;

// function joinLobby(peer, pLobby) {
//   let lobbyName = pLobby;
//   if (lobbyName === "") {
//     if (lobbies.size >= MAX_LOBBIES) {
//       throw new ProtoError(4000, STR_TOO_MANY_LOBBIES);
//     }
//     // Peer must not already be in a lobby
//     if (peer.lobby !== "") {
//       throw new ProtoError(4000, STR_ALREADY_IN_LOBBY);
//     }
//     lobbyName = randomSecret();
//     lobbies.set(lobbyName, new Lobby(lobbyName, peer.id));
//     console.log(`Peer ${peer.id} created lobby ${lobbyName}`);
//     console.log(`Open lobbies: ${lobbies.size}`);
//   }
//   const lobby = lobbies.get(lobbyName);
//   if (!lobby) throw new ProtoError(4000, STR_LOBBY_DOES_NOT_EXISTS);
//   if (lobby.sealed) throw new ProtoError(4000, STR_LOBBY_IS_SEALED);
//   peer.lobby = lobbyName;
//   console.log(
//     `Peer ${peer.id} joining lobby ${lobbyName} ` +
//       `with ${lobby.peers.length} peers`,
//   );
//   lobby.join(peer);
//   peer.ws.send(`J: ${lobbyName}\n`);
// }

// function parseMsg(peer, msg) {
//   const sep = msg.indexOf("\n");
//   if (sep < 0) throw new ProtoError(4000, STR_INVALID_FORMAT);

//   const cmd = msg.slice(0, sep);
//   if (cmd.length < 3) throw new ProtoError(4000, STR_INVALID_FORMAT);

//   const data = msg.slice(sep);

//   // Lobby joining.
//   if (cmd.startsWith("J: ")) {
//     joinLobby(peer, cmd.substr(3).trim());
//     return;
//   }

//   if (!peer.lobby) throw new ProtoError(4000, STR_NEED_LOBBY);
//   const lobby = lobbies.get(peer.lobby);
//   if (!lobby) throw new ProtoError(4000, STR_SERVER_ERROR);

//   // Lobby sealing.
//   if (cmd.startsWith("S: ")) {
//     lobby.seal(peer);
//     return;
//   }

//   // Message relaying format:
//   //
//   // [O|A|C]: DEST_ID\n
//   // PAYLOAD
//   //
//   // O: Client is sending an offer.
//   // A: Client is sending an answer.
//   // C: Client is sending a candidate.
//   let destId = parseInt(cmd.substr(3).trim());
//   // Dest is not an ID.
//   if (!destId) throw new ProtoError(4000, STR_INVALID_DEST);
//   if (destId === 1) destId = lobby.host;
//   const dest = lobby.peers.find((e) => e.id === destId);
//   // Dest is not in this room.
//   if (!dest) throw new ProtoError(4000, STR_INVALID_DEST);

//   function isCmd(what) {
//     return cmd.startsWith(`${what}: `);
//   }
//   if (isCmd("O") || isCmd("A") || isCmd("C")) {
//     dest.ws.send(cmd[0] + ": " + lobby.getPeerId(peer) + data);
//     return;
//   }
//   throw new ProtoError(4000, STR_INVALID_CMD);
// }

wss.on("connection", (ws) => {
  if (peersCount >= MAX_PEERS) {
    ws.close(4000, STR_TOO_MANY_PEERS);
    return;
  }
  peersCount++;
  const id = randomId();
  // const peer = new Peer(id, ws);
  // let auth = false;
  ws.on("message", (data, isBinary) => {
    console.log(data, isBinary);
    // const message = isBinary ? data : data.toString();
    // if (typeof message !== "string") {
    //   console.log(JSON.parse(message.toString()));
    //   ws.close(4000, STR_INVALID_TRANSFER_MODE);
    //   return;
    // }
    // if (message.startsWith("jwt")) {
    //   let token = message.substr(4);
    //   try {
    //     let token_data = jwt.verify(token, process.env.JWT_TOKEN);
    //     auth = true;
    //     console.log(token_data);
    //     // ws.close(1000, STR_AUTHORIZED);
    //     peer.ws.send(STR_AUTHORIZED);
    //     return;
    //   } catch {
    //     console.log("inccorect jwt");
    //     ws.close(1008, STR_UNAUTHORIZED);
    //     return;
    //   }
    // }
    // if (!auth) {
    //   console.log("no auth");
    //   ws.close(1008, STR_UNAUTHORIZED);
    //   return;
    // }
    // try {
    //   parseMsg(peer, message);
    // } catch (e) {
    //   const code = e.code || 4000;
    //   console.log(`Error parsing message from ${id}:\n` + message);
    //   ws.close(code, e.message);
    // }
  });
  ws.on("close", (code, reason) => {
    peersCount--;
    const peer = { id: "unknown" };
    console.log(
      `Connection with peer ${peer?.id} closed ` +
        `with reason ${code}: ${reason}`,
    );
    // if (
    //   peer.lobby &&
    //   lobbies.has(peer.lobby) &&
    //   lobbies.get(peer.lobby).leave(peer)
    // ) {
    //   lobbies.delete(peer.lobby);
    //   console.log(`Deleted lobby ${peer.lobby}`);
    //   console.log(`Open lobbies: ${lobbies.size}`);
    //   peer.lobby = "";
    // }
    // if (peer.timeout >= 0) {
    //   clearTimeout(peer.timeout);
    //   peer.timeout = -1;
    // }
  });
  ws.on("error", (error) => {
    console.error(error);
  });
});

// const interval = setInterval(() => {
//   // eslint-disable-line no-unused-vars
//   wss.clients.forEach((ws) => {
//     ws.ping();
//   });
// }, PING_INTERVAL);

app.get("/", (req, res) => {
  res.send({ message: "Sygnaling Server" });
});

server.listen(PORT, () => console.log("listening on port: ", PORT));
