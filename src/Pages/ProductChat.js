import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // connect to WebSocket server

const ProductChat = () => {
  const { productId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const userId = JSON.parse(localStorage.getItem("auth"))?.user?.userId;
  useEffect(() => {
    // Join the product-specific chat room
    socket.emit("join", { userId: userId, productId }); // replace with actual user ID

    // Listen for messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Leave the chat room when the component unmounts
      socket.emit("leave", { userId: userId, productId });
    };
  }, [userId, productId]);

  const handleSendMessage = () => {
    socket.emit("message", { productId, message: newMessage });
    setNewMessage("");
  };
  if (!socket.connected) {
    console.log("Socket is not connected to the server");
  } else {
    console.log("Socket is connected to the server");
  }
  return (
    <div className="chat-container">
      <h2>Chat with Seller</h2>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ProductChat;
