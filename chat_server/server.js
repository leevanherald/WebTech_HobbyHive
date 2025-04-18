const { Server } = require("socket.io");
const mysql = require("mysql2");
const readline = require("readline");

const io = new Server(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
console.log(process.env.DB_PASSWORD)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.CHAT_DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

console.log("Server started on port 3000.");

const socketIdToClientId = new Map();
const clientIdToSocketId = new Map();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("register", ({ client_id, username }) => {
    socketIdToClientId.set(socket.id, client_id);
    clientIdToSocketId.set(client_id, socket.id);

    console.log(`Registered client: ${client_id}`);

    socket.emit("client-list", getClientList());
    socket.broadcast.emit("client-list-update", getClientList());
  });

  socket.on("private-message", (messageData) => {
    const fromClientId = socketIdToClientId.get(socket.id);
    const toClientId = messageData.to_id;

    if (!fromClientId || !toClientId || !messageData.message) {
      return socket.emit("delivery-failed", {
        to_id: toClientId,
        message: messageData.message,
        reason: "Invalid message data or registration missing.",
      });
    }

    const timestamp = new Date();
    const payload = {
      from_id: fromClientId,
      to_id: toClientId,
      message: messageData.message,
      timestamp,
    };

    const sql = `INSERT INTO chats_table (from_id, to_id, message, date_time_stamp) VALUES (?, ?, ?, ?)`;
    db.query(
      sql,
      [payload.from_id, payload.to_id, payload.message, timestamp],
      (err) => {
        if (err) {
          console.error("Database error:", err);
          return socket.emit("delivery-failed", {
            to_id: toClientId,
            message: messageData.message,
            reason: "Database error",
          });
        }
      }
    );

    const recipientSocketId = clientIdToSocketId.get(toClientId);
    if (recipientSocketId && io.sockets.sockets.has(recipientSocketId)) {
      io.to(recipientSocketId).emit("private-message", payload);
      socket.emit("message-delivered", {
        to_id: toClientId,
        message_id: timestamp.getTime(),
      });
    } else {
      socket.emit("delivery-failed", {
        to_id: toClientId,
        message: messageData.message,
        reason: "Recipient not connected",
      });
    }
  });

  socket.on("get-chat-history", ({ to_id }, callback) => {
    const from_id = socketIdToClientId.get(socket.id);
  
    console.log(`Received get-chat-history. Socket ID: ${socket.id}`);
    console.log(`Resolved from_id: ${from_id}, Received to_id: ${to_id}`);
  
    if (!from_id || !to_id) {
      console.log("Missing from_id or to_id");
      return callback({ success: false, error: "Missing from_id or to_id" });
    }
  
    const sql = `
      SELECT * FROM chats_table
      WHERE (from_id = ? AND to_id = ?) OR (from_id = ? AND to_id = ?)
      ORDER BY date_time_stamp ASC
    `;
  
    db.query(sql, [from_id, to_id, to_id, from_id], (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return callback({ success: false, error: "Database error" });
      }
  
      callback({ success: true, messages: results });
    });
  });
  
  

  socket.on("disconnect", () => {
    const clientId = socketIdToClientId.get(socket.id);
    if (clientId) {
      console.log("Client disconnected:", clientId);
      clientIdToSocketId.delete(clientId);
      socketIdToClientId.delete(socket.id);
    }

    io.emit("client-list-update", getClientList());
  });
});

function getClientList() {
  const clients = {};
  for (const [socketId, clientId] of socketIdToClientId.entries()) {
    clients[clientId] = {
      id: clientId,
      username: `User-${clientId}`,
    };
  }
  return clients;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "list") {
    console.log("Connected clients:", Array.from(clientIdToSocketId.keys()));
  } else if (input.startsWith("broadcast:")) {
    const message = input.substring(10);
    io.emit("broadcast", {
      from_id: "SERVER",
      message,
      timestamp: Date.now(),
    });
    console.log("Broadcast message sent:", message);
  }
});


  