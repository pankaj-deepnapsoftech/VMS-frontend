import  { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "@/constants/Icons";
import { useLocation, useParams } from "react-router-dom";
import { useVulnerabililtyDataContext } from "@/context";

const ChatPage = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const { item } = location.state || {};

  const {
    ChatDataPost,
    GetChatData,
    chatData,
    isLoading,
  } = useVulnerabililtyDataContext();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const [initialChecked, setInitialChecked] = useState(false); // To prevent repeated posting

  const classification = item?.Vulnerability_Classification || '';
  const question = classification.split("-")[1] ?? classification.split("-")[0];

  // Step 1: Always fetch chat data first on load
  useEffect(() => {
    if (chatId) {
      GetChatData(chatId);
    }
  }, [chatId, location.pathname]);

  // Step 2: When chatData is updated, format it
  useEffect(() => {
    if (chatData?.length) {
      const formatted = chatData.flatMap((entry) => [
        {
          id: `${entry._id}_user`,
          sender: "user",
          text: entry.text,
        },
        {
          id: `${entry._id}_ai`,
          sender: "ai",
          text: entry.gpt_res,
        },
      ]);
      setMessages(formatted);
    }
  }, [chatData]);

  // Step 3: Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Step 4: Auto-send first question only ONCE if chat is empty
  useEffect(() => {
    if (
      !isLoading &&
      chatId &&
      !initialChecked &&
      chatData?.length === 0 &&
      item?._id
    ) {
      const firstPrompt = `Remediation measures for this ${question}. Keep it short in two points.`;
      ChatDataPost({ text: firstPrompt, task: item._id });
      setInitialChecked(true); // Prevent future calls
    }
  }, [isLoading, chatData, chatId, item?._id]);

  // Send message
  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const timestamp = Date.now();

    const userMessage = {
      id: `${timestamp}_user`,
      sender: "user",
      text: trimmedInput,
    };

    const aiTypingMessage = {
      id: `${timestamp}_ai_typing`,
      sender: "ai",
      text: "Typing...",
    };

    setMessages((prev) => [...prev, userMessage, aiTypingMessage]);
    setInput("");

    ChatDataPost({ text: trimmedInput, task: chatId });

    setTimeout(() => {
      GetChatData(chatId);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <div className="flex-1 p-4 pb-32 max-w-screen-lg mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
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
              {msg.sender === "user" && (
                <FaUserCircle className="w-5 h-5 mt-0.5" />
              )}
              <span className="whitespace-pre-wrap break-words">
                {msg.text}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-10 lg:left-20 w-full bg-white border-t p-3">
        <div className="flex items-center gap-2 max-w-screen-md mx-auto w-full px-2 sm:px-0">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 text-sm rounded-full hover:bg-blue-700 transition font-semibold shadow"
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
