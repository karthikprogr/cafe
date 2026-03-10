import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const MENU_KEYWORDS = {
  coffee: ['cold brew', 'cappuccino', 'latte', 'espresso', 'americano'],
  pizza: ['margherita', 'pepperoni', 'wood-fired', 'quattro formaggi'],
  pasta: ['spaghetti carbonara', 'penne arrabbiata', 'fettuccine alfredo'],
  dessert: ['tiramisu', 'cheesecake', 'brownies', 'ice cream'],
  milkshake: ['oreo', 'strawberry', 'chocolate', 'vanilla bean'],
};

const BOT_RESPONSES = {
  greeting: [
    "Hello! Welcome to Venissa Cafe & Kitchen 👋 I'm your AI menu assistant. What are you in the mood for today?",
    "Hi there! I'm Venissa Bot 🤖 Ready to help you pick the perfect dish or brew!",
  ],
  coffee: "☕ Our coffee collection is amazing! Try our **Signature Cold Brew** (₹299) — slow-steeped for 24 hours for maximum flavor. The **Caramel Cappuccino** (₹199) is also a crowd favorite. Which sounds better?",
  pizza: "🍕 Our wood-fired pizzas are a must-try! The **Margherita Classica** (₹349) uses fresh buffalo mozzarella, or go bold with the **Spicy Pepperoni** (₹399). Both come in 10\" hand-tossed crust!",
  pasta: "🍝 Chef's special recommendation: **Spaghetti Carbonara** (₹329) with real guanciale, or the creamy **Fettuccine Alfredo** (₹299). Perfect comfort food!",
  dessert: "🍰 For sweets, our **Tiramisu** (₹199) is legendary — made fresh daily! The **Molten Dark Chocolate Cake** (₹229) with vanilla ice cream is pure indulgence.",
  milkshake: "🥤 Our thick milkshakes are life-changing! The **Oreo Overload** (₹249) and **Strawberry Dream** (₹229) are best-sellers. Served in frosted glasses!",
  default: "I'd love to help you choose! We have amazing **Coffee**, **Pizza**, **Pasta**, **Milkshakes**, and **Desserts**. What are you craving? 😊",
  recommend: "✨ Today's top picks: **Signature Cold Brew** ☕, **Margherita Pizza** 🍕, and **Tiramisu** 🍰. A perfect meal combo at Venissa!",
  location: "📍 We're located at **LB Nagar, Hyderabad**. Open daily from **8 AM to 11 PM**. You can also book a table or order online right here!",
  hours: "🕐 Venissa Cafe is open **7 days a week**, from **8:00 AM to 11:00 PM**. We're always ready for your visit!",
};

function getBotReply(message) {
  const msg = message.toLowerCase();
  if (/hi|hello|hey|good morning|good evening/i.test(msg)) {
    return BOT_RESPONSES.greeting[Math.floor(Math.random() * BOT_RESPONSES.greeting.length)];
  }
  if (/coffee|brew|cappuccino|latte|espresso/i.test(msg)) return BOT_RESPONSES.coffee;
  if (/pizza/i.test(msg)) return BOT_RESPONSES.pizza;
  if (/pasta|spaghetti|fettuccine/i.test(msg)) return BOT_RESPONSES.pasta;
  if (/dessert|cake|tiramisu|sweet/i.test(msg)) return BOT_RESPONSES.dessert;
  if (/milkshake|shake|smoothie/i.test(msg)) return BOT_RESPONSES.milkshake;
  if (/recommend|suggest|best|popular|what should/i.test(msg)) return BOT_RESPONSES.recommend;
  if (/location|address|where|find/i.test(msg)) return BOT_RESPONSES.location;
  if (/time|hours|open|close|timing/i.test(msg)) return BOT_RESPONSES.hours;
  return BOT_RESPONSES.default;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "Hello! Welcome to Venissa Cafe & Kitchen 👋 I'm your AI menu assistant. What are you in the mood for today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      from: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(input);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000 + Math.random() * 500);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = ['☕ Coffee', '🍕 Pizza', '🍰 Desserts', '✨ Recommend'];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-[#0f0f0f] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a1200] to-[#1a0f00] border-b border-[#D4A853]/20 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#F5C842] flex items-center justify-center">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Venissa AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/40 text-[10px]">Online now</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto p-1.5 rounded-lg hover:bg-white/[0.07] transition-colors"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.from === 'bot'
                        ? 'bg-gradient-to-br from-[#D4A853] to-[#F5C842]'
                        : 'bg-white/[0.1]'
                    }`}
                  >
                    {msg.from === 'bot' ? (
                      <Bot className="w-4 h-4 text-black" />
                    ) : (
                      <User className="w-4 h-4 text-white/60" />
                    )}
                  </div>
                  <div className={`max-w-[80%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div
                      className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                        msg.from === 'user'
                          ? 'bg-gradient-to-r from-[#D4A853] to-[#F5C842] text-black font-medium'
                          : 'bg-white/[0.06] border border-white/[0.07] text-white/80'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-white/20 text-[10px] px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4A853] to-[#F5C842] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/[0.07] px-4 py-3 rounded-xl flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 bg-[#D4A853] rounded-full block"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 hover:border-[#D4A853]/40 hover:text-[#D4A853] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/[0.06] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4A853]/40 transition-colors"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-9 h-9 bg-gradient-to-r from-[#D4A853] to-[#F5C842] rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4 text-black" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-gradient-to-br from-[#D4A853] to-[#F5C842] rounded-2xl shadow-2xl shadow-[#D4A853]/30 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
