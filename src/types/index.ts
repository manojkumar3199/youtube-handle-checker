export interface HandleResult {
  handle: string;
  status: 'available' | 'taken' | 'error' | 'checking';
  error?: string;
  checkedAt: Date;
}

export interface CheckProgress {
  total: number;
  completed: number;
  inProgress: number;
}

export interface ValidationError {
  handle: string;
  message: string;
}