import React from 'react';
import { HandleResult } from '@/types';
import { Check, X, AlertCircle, ExternalLink, Copy, Download } from 'lucide-react';

interface ResultsDisplayProps {
  results: HandleResult[];
  isVisible: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  isVisible
}) => {
  if (!isVisible || results.length === 0) return null;

  const availableHandles = results.filter(r => r.status === 'available');
  const takenHandles = results.filter(r => r.status === 'taken');
  const errorHandles = results.filter(r => r.status === 'error');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportResults = () => {
    const csv = [
      ['Handle', 'Status', 'Checked At', 'Notes'],
      ...results.map(r => [
        r.handle,
        r.status,
        r.checkedAt.toLocaleString(),
        r.status === 'error' ? (r.error || 'Unable to verify due to network restrictions') : ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `youtube-handles-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: HandleResult['status']) => {
    switch (status) {
      case 'available':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'taken':
        return <X className="w-5 h-5 text-red-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
    }
  };

  const getStatusBadge = (status: HandleResult['status']) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'available':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'taken':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'error':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'checking':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Results Summary</h3>
          <button
            onClick={exportResults}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4 mr-1" />
            Export CSV
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <Check className="w-6 h-6 text-green-600 mr-2" />
              <div>
                <p className="text-2xl font-bold text-green-900">{availableHandles.length}</p>
                <p className="text-sm text-green-700">Available</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <X className="w-6 h-6 text-red-600 mr-2" />
              <div>
                <p className="text-2xl font-bold text-red-900">{takenHandles.length}</p>
                <p className="text-sm text-red-700">Taken</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-2" />
              <div>
                <p className="text-2xl font-bold text-yellow-900">{errorHandles.length}</p>
                <p className="text-sm text-yellow-700">Unverified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Results</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {results.map((result, index) => (
            <div key={`${result.handle}-${index}`} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        @{result.handle}
                      </code>
                      <button
                        onClick={() => copyToClipboard(result.handle)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy handle"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={getStatusBadge(result.status)}>
                        {result.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        Checked {result.checkedAt.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.open(`https://www.youtube.com/@${result.handle}`, '_blank')}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {result.error && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
                  {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;