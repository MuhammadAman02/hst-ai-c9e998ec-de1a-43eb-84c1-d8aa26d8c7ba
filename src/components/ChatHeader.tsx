import { Button } from '@/components/ui/button';
import { Settings, MessageSquare } from 'lucide-react';

interface ChatHeaderProps {
  onResetApiKey: () => void;
}

export const ChatHeader = ({ onResetApiKey }: ChatHeaderProps) => {
  console.log('ChatHeader component rendered');

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">AI Chat</h1>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onResetApiKey}
          className="flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
};