import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Trash2, Sparkles } from 'lucide-react';
import { CampusAssistantClient } from '../copilot/client';
import type { ChatMessage } from '../copilot/client';
import ChatBubble from '../components/ChatBubble';

const client = new CampusAssistantClient();

const suggestedPrompts = [
  'Find students in Computer Science',
  'List all courses',
  'Who are the faculty members?',
  'Show university statistics',
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message || isLoading) return;

    setInput('');
    setIsLoading(true);

    try {
      const responses = await client.sendMessage(message);
      setMessages(prev => [...prev, ...responses.filter(r => r.role === 'user' ? false : true)]);
      // Add the user message manually since client tracks it internally
      setMessages(prev => {
        const userMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'user',
          content: message,
          timestamp: new Date(),
        };
        // Insert user message before the responses
        const withoutNew = prev.slice(0, prev.length - responses.filter(r => r.role !== 'user').length);
        return [...withoutNew, userMsg, ...responses.filter(r => r.role !== 'user')];
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    client.clearHistory();
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            AI Campus Assistant
          </h2>
          <p className="text-gray-500 mt-1">
            Powered by GitHub Copilot SDK — ask about students, courses, and faculty.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* SDK Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <Bot className="w-5 h-5 text-purple-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-purple-900">Copilot SDK Demo</p>
            <p className="text-purple-700 mt-1">
              This assistant demonstrates <code className="bg-purple-100 px-1 rounded">@github/copilot-sdk</code> integration
              with custom tools: <code className="bg-purple-100 px-1 rounded">searchStudents</code>,{' '}
              <code className="bg-purple-100 px-1 rounded">listCourses</code>,{' '}
              <code className="bg-purple-100 px-1 rounded">getTeacherInfo</code>, and{' '}
              <code className="bg-purple-100 px-1 rounded">getUniversityStats</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">How can I help you today?</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">Try one of these prompts to get started:</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {suggestedPrompts.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <ChatBubble key={msg.id} message={msg} />
          ))
        )}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about students, courses, or faculty..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
