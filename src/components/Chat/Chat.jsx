import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import socket from "../../Sockets/socket.js";
import "./Chat.css";

export default function Chat() {
  const { activityId } = useParams();

  const userId = String(localStorage.getItem("userId"));
  const username = localStorage.getItem("username");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Load old messages
  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:3000/api/messages/${activityId}`);
      const data = await res.json();

      const normalized = data.map(m => ({
        ...m,
        userId: String(m.userId),
        timestamp: m.timestamp || m.createdAt
      }));

      setMessages(normalized);
    }

    load();
  }, [activityId]);

  // Join socket room + listen
  useEffect(() => {
    if (!userId || !username) return;

    socket.emit("joinActivity", { activityId, userId, username });

    const onReceive = msg => {
      setMessages(prev => [
        ...prev,
        {
          ...msg,
          userId: String(msg.userId),
          timestamp: msg.timestamp
        }
      ]);
    };

    const onSystem = msg => {
      setMessages(prev => [
        ...prev,
        {
          ...msg,
          system: true,
          timestamp: msg.timestamp
        }
      ]);
    };

    socket.on("receiveMessage", onReceive);
    socket.on("systemMessage", onSystem);

    return () => {
      socket.off("receiveMessage", onReceive);
      socket.off("systemMessage", onSystem);
    };
  }, [activityId, userId, username]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      activityId,
      userId,
      username,
      text: input
    });

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Activity Chat</h2>

      <div className="messages-box">
        {messages.map((m, i) => {
          const mine = String(m.userId) === String(userId);

          return (
            <div
              key={i}
              className={`message ${mine ? "me" : "other"} ${m.system ? "system" : ""}`}
            >
              {!m.system && <div className="sender-name">{mine ? "You" : m.username}</div>}
              <p>{m.text}</p>
              <small>{new Date(m.timestamp).toLocaleTimeString()}</small>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          placeholder="Type message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}