import { HandleResult } from '@/types';
import { supabase } from '@/lib/supabase';

// Cache to avoid duplicate requests during the session
const handleCache = new Map<string, HandleResult>();

const checkYouTubeHandle = async (handle: string): Promise<HandleResult> => {
  // Check cache first
  if (handleCache.has(handle)) {
    return handleCache.get(handle)!;
  }

  const result: HandleResult = {
    handle,
    status: 'checking',
    checkedAt: new Date()
  };

  try {
    // Call the backend Edge Function to check handle
    const { data, error } = await supabase.functions.invoke('youtube-handle-checker', {
      body: { handles: [handle] }
    });

    if (error) {
      throw new Error(error.message);
    }

    // Extract result from backend response
    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      const backendResult = data.data[0];
      result.status = backendResult.status;
      result.error = backendResult.error;
      result.checkedAt = new Date(backendResult.checkedAt);
    } else {
      throw new Error('Invalid response from backend');
    }
    
  } catch (error) {
    // If there's an error calling the backend, mark as error
    result.status = 'error';
    result.error = error instanceof Error ? error.message : 'Failed to check handle';
  }

  // Cache the result
  handleCache.set(handle, result);
  return result;
};

export const checkMultipleHandles = async (
  handles: string[],
  onProgress?: (completed: number, total: number) => void
): Promise<HandleResult[]> => {
  const results: HandleResult[] = [];
  let completedCount = 0;

  // Check if we can use batch checking (all handles not in cache)
  const uncachedHandles = handles.filter(h => !handleCache.has(h));
  
  if (uncachedHandles.length > 0) {
    // Call backend API with all uncached handles at once
    try {
      const { data, error } = await supabase.functions.invoke('youtube-handle-checker', {
        body: { handles: uncachedHandles }
      });

      if (!error && data?.data && Array.isArray(data.data)) {
        // Cache all results from backend
        data.data.forEach((backendResult: any) => {
          const result: HandleResult = {
            handle: backendResult.handle,
            status: backendResult.status,
            error: backendResult.error,
            checkedAt: new Date(backendResult.checkedAt)
          };
          handleCache.set(backendResult.handle, result);
        });
      } else {
        // If batch check failed, mark all uncached handles as error
        uncachedHandles.forEach(handle => {
          const errorResult: HandleResult = {
            handle,
            status: 'error',
            error: error?.message || 'Failed to check handle',
            checkedAt: new Date()
          };
          handleCache.set(handle, errorResult);
        });
      }
    } catch (error) {
      // If batch check failed, mark all uncached handles as error
      uncachedHandles.forEach(handle => {
        const errorResult: HandleResult = {
          handle,
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to check handle',
          checkedAt: new Date()
        };
        handleCache.set(handle, errorResult);
      });
    }
  }

  // Collect results from cache and update progress
  for (const handle of handles) {
    const cachedResult = handleCache.get(handle);
    if (cachedResult) {
      results.push(cachedResult);
    } else {
      // This should not happen, but add error result just in case
      results.push({
        handle,
        status: 'error',
        error: 'Handle check failed',
        checkedAt: new Date()
      });
    }
    completedCount++;
    onProgress?.(completedCount, handles.length);
  }

  return results;
};

export const clearHandleCache = (): void => {
  handleCache.clear();
};
