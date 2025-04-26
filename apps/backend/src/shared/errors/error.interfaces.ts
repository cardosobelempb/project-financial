// error.interfaces.ts
export interface StandardError {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
}

export interface ValidationError extends StandardError {
  errors?: { field: string; message: string }[]
}
