import { ValidationError } from '@/types';

export const validateHandle = (handle: string): ValidationError | null => {
  const trimmed = handle.trim();
  
  if (!trimmed) {
    return { handle: handle, message: 'Handle cannot be empty' };
  }
  
  // YouTube handle validation rules
  if (trimmed.length < 3) {
    return { handle: handle, message: 'Handle must be at least 3 characters long' };
  }
  
  if (trimmed.length > 30) {
    return { handle: handle, message: 'Handle cannot exceed 30 characters' };
  }
  
  // YouTube handles can contain letters, numbers, underscores, and hyphens
  // But cannot start or end with certain characters
  const handleRegex = /^[a-zA-Z0-9][a-zA-Z0-9_-]*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/;
  
  if (!handleRegex.test(trimmed)) {
    return { 
      handle: handle, 
      message: 'Handle must start and end with alphanumeric characters, can contain hyphens and underscores in between' 
    };
  }
  
  // Check for reserved handles
  const reservedHandles = ['admin', 'root', 'system', 'support', 'help'];
  if (reservedHandles.includes(trimmed.toLowerCase())) {
    return { handle: handle, message: 'This handle is reserved and cannot be used' };
  }
  
  return null;
};

export const validateMultipleHandles = (handles: string[]): {
  valid: string[];
  errors: ValidationError[];
} => {
  const valid: string[] = [];
  const errors: ValidationError[] = [];
  
  handles.forEach(handle => {
    const error = validateHandle(handle);
    if (error) {
      errors.push(error);
    } else {
      valid.push(handle.trim().toLowerCase());
    }
  });
  
  return { valid, errors };
};