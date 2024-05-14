import React, { useState, useEffect, useCallback, useRef } from "react";
import { Table, Modal, Input, Button } from "antd";
import { io } from "socket.io-client";
import axios from "axios";

const SellerChat = () => {
  const wholesalerId = JSON.parse(localStorage.getItem("auth"))?.seller?.id;
  const scroll = useRef();
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const columns = [
    {
      title: "Sender Name",
      dataIndex: "senderName",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Button onClick={() => handleReply(record)}>Reply</Button>
      ),
    },
  ];

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/chat/${wholesalerId}`
      );
      setChats(response.data || []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  }, [wholesalerId]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/message/${chatId}`
      );
      setMessages(response.data || []);
    } catch (error) {
      console.error("Error fetching previous messages:", error);
    }
  };
  const handleReply = (record) => {
    setSelectedChat(record);
    setReplyModalVisible(true);
    fetchMessages(record._id);
  };

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", wholesalerId);

    socket.current.on("receive-message", (newMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [wholesalerId]);

  const handleSendReply = async () => {
    const receiverId = selectedChat.members.find(
      (memberId) => memberId !== wholesalerId
    );
    const payload = {
      chatId: selectedChat._id,
      senderId: wholesalerId,
      text: replyMessage,
      receiverId,
    };
    try {
      await axios.post(`http://localhost:5000/message`, payload);

      socket.current.emit("send-message", payload);

      setReplyMessage("");
      fetchMessages(selectedChat._id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <h3 className="mb-4 title">Conversations</h3>
      <div className="chats-table-container">
        <Table
          dataSource={chats}
          columns={columns}
          loading={loading}
          rowKey={(record) => record._id}
        />
        <Modal
          open={replyModalVisible}
          onCancel={() => setReplyModalVisible(false)}
          footer={null}
        >
          <h6 className="title mb-2">Reply to {selectedChat?.senderName}</h6>
          <div className="chat-container">
            {messages.map((message, index) => (
              <div
                ref={scroll}
                key={index}
                className={`message ${
                  message.senderId === wholesalerId ? "sender" : "receiver"
                }`}
              >
                <p className="mb-0 mx-2">{message.text}</p>
              </div>
            ))}
          </div>
          <div className="d-flex">
            <Input
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply..."
              className="me-2"
            />
            <Button key="send" type="primary" onClick={handleSendReply}>
              Send
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SellerChat;
