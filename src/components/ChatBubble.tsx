import type { ChatMessage } from '../copilot/client';
import { Bot, User, Wrench } from 'lucide-react';

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  const isTool = message.role === 'tool';

  if (isTool) {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs text-gray-500">
          <Wrench className="w-3 h-3" />
          <span>Tool: <code className="font-mono">{message.toolCall?.name}</code></span>
          <span>— {message.content}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'
      }`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-blue-600 text-white'
          : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        <div className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content.split('\n').map((line, i) => (
            <span key={i}>
              {line.replace(/\*\*(.*?)\*\*/g, '«$1»').split('«').map((part, j) => {
                if (part.includes('»')) {
                  const [bold, rest] = part.split('»');
                  return <span key={j}><strong>{bold}</strong>{rest}</span>;
                }
                return <span key={j}>{part}</span>;
              })}
              {i < message.content.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
