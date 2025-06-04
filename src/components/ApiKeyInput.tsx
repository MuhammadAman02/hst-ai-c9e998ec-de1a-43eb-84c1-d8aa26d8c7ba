import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Shield } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log('ApiKeyInput component rendered');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('API key form submitted');
    
    if (!apiKey.trim()) {
      console.warn('Empty API key submitted');
      return;
    }

    setIsLoading(true);
    console.log('Setting loading state to true');
    
    // Simulate a brief validation delay
    setTimeout(() => {
      console.log('API key validation complete');
      onApiKeySubmit(apiKey.trim());
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Key className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">OpenAI API Setup</CardTitle>
          <CardDescription>
            Enter your OpenAI API key to start chatting with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono text-sm"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 mt-0.5 text-green-600" />
              <p>
                Your API key is stored locally and never sent to our servers.
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!apiKey.trim() || isLoading}
            >
              {isLoading ? 'Validating...' : 'Start Chatting'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};