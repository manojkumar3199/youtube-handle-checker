import React, { useState } from 'react';
import Header from '@/components/Header';
import HandleInput from '@/components/HandleInput';
import ProgressIndicator from '@/components/ProgressIndicator';
import ResultsDisplay from '@/components/ResultsDisplay';
import Footer from '@/components/Footer';
import { HandleResult, CheckProgress } from '@/types';
import { validateMultipleHandles } from '@/utils/validation';
import { checkMultipleHandles, clearHandleCache } from '@/utils/youtubeChecker';

function App() {
  const [results, setResults] = useState<HandleResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Array<{ handle: string; message: string }>>([]);
  const [progress, setProgress] = useState<CheckProgress>({ total: 0, completed: 0, inProgress: 0 });
  const [hasStartedChecking, setHasStartedChecking] = useState(false);

  const handleSubmit = async (handles: string[]) => {
    // Clear previous results
    setResults([]);
    setHasStartedChecking(true);
    
    // Validate handles
    const { valid, errors } = validateMultipleHandles(handles);
    setValidationErrors(errors);

    if (errors.length > 0) {
      console.warn('Validation errors:', errors);
    }

    if (valid.length === 0) {
      return;
    }

    // Initialize progress
    setProgress({ total: valid.length, completed: 0, inProgress: valid.length });
    setIsLoading(true);

    try {
      const newResults = await checkMultipleHandles(
        valid,
        (completed: number, total: number) => {
          setProgress({
            total,
            completed,
            inProgress: total - completed
          });
        }
      );

      setResults(newResults);
    } catch (error) {
      console.error('Error checking handles:', error);
      // Handle global errors
      const errorResults = valid.map(handle => ({
        handle,
        status: 'error' as const,
        error: 'Failed to check handle due to network error',
        checkedAt: new Date()
      }));
      setResults(errorResults);
    } finally {
      setIsLoading(false);
      setProgress({ total: 0, completed: 0, inProgress: 0 });
    }
  };

  const clearResults = () => {
    setResults([]);
    setValidationErrors([]);
    setHasStartedChecking(false);
    clearHandleCache();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <div className="text-center">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quickly check if your desired YouTube handle is available. 
            Enter multiple handles separated by commas or new lines to check them all at once.
          </p>
        </div>

        {/* Handle Input Form */}
        <HandleInput
          onSubmit={handleSubmit}
          isLoading={isLoading}
          validationErrors={validationErrors}
        />

        {/* Progress Indicator */}
        <ProgressIndicator
          progress={progress}
          isVisible={isLoading}
        />

        {/* Results */}
        <ResultsDisplay
          results={results}
          isVisible={results.length > 0}
        />

        {/* Clear Results Button */}
        {results.length > 0 && !isLoading && (
          <div className="text-center">
            <button
              onClick={clearResults}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Clear Results
            </button>
          </div>
        )}

        {/* Help Text */}
        {!hasStartedChecking && !isLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h3>
            <div className="text-blue-800 space-y-2 text-sm">
              <p>1. Enter one or more YouTube handles in the text area above</p>
              <p>2. Handles can be separated by commas, semicolons, or new lines</p>
              <p>3. Click "Check Handles" to start the verification process</p>
              <p>4. View results instantly with availability status for each handle</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;