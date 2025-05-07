// Default to localhost:8000 for the backend API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API endpoints from swagger documentation
export const API_ENDPOINTS = {
  QUERY: `${API_URL}/query`,
  UPLOAD: `${API_URL}/upload`,
  INGEST: `${API_URL}/ingest`,
  INGEST_STATUS: (jobId: string) => `${API_URL}/ingest/${jobId}`,
}; 