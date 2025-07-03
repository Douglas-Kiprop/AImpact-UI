import React, { useState } from 'react';
import { Send, Sparkles, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SuggestionChip {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const suggestions: SuggestionChip[] = [
    {
      id: 'seo',
      label: 'SEO Keyword Generator',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'nurturing',
      label: 'Lead Nurturing',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'thread',
      label: 'X Thread Generator',
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  const handleSuggestionClick = (suggestion: SuggestionChip) => {
    const suggestionMessage = `Help me with ${suggestion.label.toLowerCase()}`;
    setMessage(suggestionMessage);
    handleSubmit(null, suggestionMessage);
  };

  const handleSubmit = async (e: React.FormEvent | null, customMessage?: string) => {
    if (e) e.preventDefault();

    const messageText = customMessage || message.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsExpanded(true);
    setIsTyping(true);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: messageText }), // Send the user's message as 'query'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response, // Assuming the Flask backend returns a 'response' field
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error querying agent:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't get a response from the agent. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBack = () => {
    setIsExpanded(false);
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-vanta-black z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-silver/10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-silver hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h2 className="text-xl font-semibold text-white">AImpact Super Agent</h2>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-2xl ${msg.isUser ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-6 py-4 rounded-2xl ${
                    msg.isUser
                      ? 'bg-silver/20 text-white ml-auto'
                      : 'bg-white/5 text-silver border border-silver/10'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
              {!msg.isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-silver/30 to-silver/10 
                              flex items-center justify-center mr-3 order-1 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-silver" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-silver/30 to-silver/10 
                            flex items-center justify-center mr-3 flex-shrink-0">
                <Sparkles className="w-4 h-4 text-silver animate-pulse" />
              </div>
              <div className="max-w-2xl">
                <div className="bg-white/5 border border-silver/10 rounded-2xl px-6 py-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-silver/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-silver/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-silver/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-silver/10">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-silver/20 
                       rounded-2xl text-white placeholder-silver/50 focus:outline-none 
                       focus:border-silver/40 focus:bg-white/15 transition-all duration-300 pr-14"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl
                       bg-silver/20 hover:bg-silver/30 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 hover:scale-105"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
            className="group relative px-6 py-3 bg-white/5 backdrop-blur-md border border-silver/20 rounded-full
                     hover:bg-white/10 hover:border-silver/40 transition-all duration-300
                     hover:shadow-lg hover:shadow-silver/20 hover:scale-105"
          >
            <div className="flex items-center gap-2 text-silver/90 group-hover:text-white transition-colors">
              {suggestion.icon}
              <span className="text-sm font-medium">{suggestion.label}</span>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-silver/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
          </button>
        ))}
      </div>

      {/* Chat Input - only the input bar now! */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-silver/20 
                   rounded-2xl text-white placeholder-silver/50 focus:outline-none 
                   focus:border-silver/40 focus:bg-white/15 transition-all duration-300 pr-14"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl
                   bg-silver/20 hover:bg-silver/30 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 hover:scale-105"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
