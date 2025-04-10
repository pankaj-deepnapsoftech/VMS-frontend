import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { useVulnerabililtyDataContext } from "@/context";

const ChatPage = () => {
  const { chatId } = useParams();
  const location=useLocation()
  console.log(location,"dsnkgoauhgljkblkjfdn");
  const {item}=location.state || {};
  console.log("Item :",item)
  const { ChatDataPost, GetChatData, chatData } = useVulnerabililtyDataContext();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (chatId) GetChatData(chatId);
  }, [chatId]);

  useEffect(() => {
    if (chatData?.length) {
      const formatted = chatData.flatMap((item) => [
        {
          id: item._id + "_user",
          sender: "user",
          text: item.text,
        },
        {
          id: item._id + "_ai",
          sender: "ai",
          text: item.gpt_res,
        },
      ]);
      setMessages(formatted);
    }
  }, [chatData]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const timestamp = Date.now();
    const userMsg = {
      id: `${timestamp}_user`,
      sender: "user",
      text: trimmed,
    };

    const aiTypingMsg = {
      id: `${timestamp}_ai_typing`,
      sender: "ai",
      text: "Typing...",
    };

    setMessages((prev) => [...prev, userMsg, aiTypingMsg]);
    setInput("");

    ChatDataPost({ text: trimmed, task: chatId });

    setTimeout(() => {
      GetChatData(chatId);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-white relative">
      {/* Chat Messages */}
      <div className="flex-1 p-4 pb-32  max-w-screen-lg   mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                alt="ChatGPT"
                className="w-8 h-8 mr-2 rounded-full bg-white border shadow-2xl"
              />
            )}
            <div
              className={`px-4 m-2 py-2 text-sm rounded-2xl shadow-sm flex items-start gap-2 transition-all duration-300 max-w-[85%] sm:max-w-sm md:max-w-md ${
                msg.sender === "user"
                  ? "bg-gray-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.sender === "user" && <FaUserCircle className="w-5 h-5 mt-0.5" />}
              <span className="whitespace-pre-wrap break-words ">{msg.text}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Field */}
      <div className="fixed bottom-10 lg:left-20  w-full bg-white border-t p-3 ">
        <div className="flex items-center gap-2 max-w-screen-md mx-auto w-full px-2 sm:px-0">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 w-fulltext-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 text-sm rounded-full hover:bg-blue-700 transition font-semibold shadow whitespace-nowrap"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
