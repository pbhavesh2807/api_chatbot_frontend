# AI Chatbot UI

A modern chatbot interface built with Next.js, TypeScript, and Tailwind CSS that connects to an AWS Bedrock knowledge base backend.

## Features

- Clean, responsive UI design with a search-style interface
- Real-time message display with proper formatting of newlines
- Typing indicator for pending responses
- Error handling with specific error messages
- TypeScript support
- Built with Next.js App Router

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start the production server:
```bash
npm start
```

## Backend Integration

The frontend is configured to connect to the Knowledge Base API running on `http://localhost:8000` with the following endpoints:

### Query Endpoint
- **POST** `/query`
  - Request body: `{ text: string }`
  - Response format: `{ "response": "string" }`
  - The response string may contain newline characters (`\n`) which are properly rendered in the UI

### File Upload Endpoint (Optional Integration)
- **POST** `/upload`
  - Request body: Multipart form with a file attachment
  - Returns: `{ s3_key: string, message: string }`
  - Use for uploading text files to the knowledge base

### Ingestion Endpoints (Optional Integration)
- **POST** `/ingest`
  - Triggers the ingestion job to process S3 files
  - Returns: `{ ingestion_job_id: string, status: string }`

- **GET** `/ingest/{ingestion_job_id}`
  - Checks the status of an ingestion job
  - Use to monitor the progress of data ingestion

### Configuring the Backend URL

If your backend is running on a different URL, you can set the `NEXT_PUBLIC_API_URL` environment variable:

```bash
# Development
NEXT_PUBLIC_API_URL=http://your-backend-url npm run dev

# Production
NEXT_PUBLIC_API_URL=http://your-backend-url npm start
```

Or create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=http://your-backend-url
```

## Error Handling

The application includes comprehensive error handling for various HTTP status codes:
- **422**: Validation errors (invalid request format)
- **404**: Resource not found
- **500**: Server errors
- Network errors (when the server is unreachable)

## Project Structure

- `src/app/page.tsx` - Main page component
- `src/components/ChatInterface.tsx` - Main chat interface that manages state and API calls
- `src/components/ChatMessage.tsx` - Component for individual chat messages
- `src/components/MessageInput.tsx` - Input form for sending messages
- `src/config/index.ts` - API configuration
- `src/types/index.ts` - TypeScript type definitions

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios 