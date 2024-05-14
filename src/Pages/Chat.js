import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const Chat = () => {
  const location = useLocation();
  const scroll = useRef();
  const socket = useRef();
  const { chatId } = useParams();
  const { productName, sellerName, productId, receiverId } = location.state;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const senderId = JSON.parse(localStorage.getItem("auth")).user.userId;

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/message/${chatId}`
      );
      setMessages(response.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [chatId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", senderId);

    socket.current.on("receive-message", (newMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [senderId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const payload = {
      chatId,
      senderId,
      receiverId,
      text: newMessage,
    };
    try {
      await axios.post(`http://localhost:5000/message`, payload);

      socket.current.emit("send-message", payload);

      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header />
      <Meta title={"Chat"} />
      <BreadCrumb
        items={[
          { title: "Home", url: "/" },
          { title: "Our Store", url: "/store" },
          { title: productName, url: `/store/${productId}` },
          { title: "Chat with Seller" },
        ]}
      />
      <div
        className="chat-wrapper home-wrapper-2 d-flex flex-column justify-content-center"
        style={{ minHeight: "calc(100vh - 147px)" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="chat-section">
                <h2 className="title mb-2">{sellerName}</h2>
                <div className="chat-container d-flex flex-column">
                  <div className="messages-container flex-grow-1">
                    {messages.map((message, index) => (
                      <div
                        ref={scroll}
                        key={index}
                        className={`message ${
                          message.senderId === senderId ? "sender" : "receiver"
                        }`}
                      >
                        <p className="mb-0 mx-2">{message.text}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <form onSubmit={sendMessage} className="d-flex">
                      <input
                        type="text"
                        className="form-control"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                      />
                      <button className="button ms-2" type="submit">
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
