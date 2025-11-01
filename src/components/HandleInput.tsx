import React, { useState } from 'react';
import { Send, AlertCircle, Eraser } from 'lucide-react';

interface HandleInputProps {
  onSubmit: (handles: string[]) => void;
  isLoading: boolean;
  validationErrors: Array<{ handle: string; message: string }>;
}

const HandleInput: React.FC<HandleInputProps> = ({
  onSubmit,
  isLoading,
  validationErrors
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse input by lines first, then clean each line by removing spaces
    const handles = input
      .split('\n') // Split by newlines only
      .map(line => line.trim())
      .filter(line => line.length > 0) // Remove empty lines
      .map(line => line.replace(/\s+/g, '')) // Remove all spaces from each line
      .slice(0, 50); // Limit to 50 handles at a time

    if (handles.length === 0) {
      return;
    }

    onSubmit(handles);
    // Don't clear input - user wants to keep the list
  };

  const handleClear = () => {
    setInput('');
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    // Auto-submit when user pastes multiple lines/handles
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.includes('\n')) {
      setTimeout(() => {
        const handles = pastedText
          .split('\n') // Split by newlines only
          .map(line => line.trim())
          .filter(line => line.length > 0) // Remove empty lines
          .map(line => line.replace(/\s+/g, '')) // Remove all spaces from each line
          .slice(0, 50);
        if (handles.length > 1) {
          onSubmit(handles);
          // Don't clear input - user wants to keep the list
        }
      }, 100);
    }
  };

  const remainingHandles = 50 - input.split('\n').filter(line => line.trim().length > 0).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="handle-input" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            YouTube Handles to Check
          </label>
          <div className="relative">
            <textarea
              id="handle-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={handlePaste}
              placeholder="Enter YouTube handles, one per line:&#10;ABC&#10;XYZ&#10;IJK"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none text-sm"
              rows={4}
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                {remainingHandles > 0 ? `${remainingHandles} left` : 'Limit reached'}
              </span>
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading || input.trim().length === 0}
                className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Eraser className="w-4 h-4 mr-1" />
                Clear
              </button>
              <button
                type="submit"
                disabled={isLoading || input.trim().length === 0}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? 'Checking...' : 'Check Handles'}
              </button>
            </div>
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-yellow-800 font-medium mb-1">Validation Errors:</p>
                <ul className="text-yellow-700 space-y-1">
                  {validationErrors.slice(0, 5).map((error, index) => (
                    <li key={index}>
                      <span className="font-mono text-xs bg-yellow-100 px-1 rounded">{error.handle}</span>
                      {' '}: {error.message}
                    </li>
                  ))}
                  {validationErrors.length > 5 && (
                    <li className="text-yellow-600">
                      ...and {validationErrors.length - 5} more errors
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-500 space-y-1">
          <p><strong>Rules:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>3-30 characters long</li>
            <li>Spaces will be automatically removed from each line</li>
            <li>Can contain letters, numbers, underscores, and hyphens</li>
            <li>Must start and end with alphanumeric characters</li>
            <li>Some handles are reserved and unavailable</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default HandleInput;