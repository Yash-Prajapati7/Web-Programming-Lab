# Experiment 6 - Node.js HTTP Server for Static Files

## Aim
Build a simple Node.js application using the http module to create a basic web server that serves static content from a directory, helping beginners learn how to handle HTTP requests, responses, and file serving.

## Prerequisites
- Node.js installed (v14 or higher)
- Basic understanding of JavaScript
- Terminal/Command Prompt access

## Setup Instructions

### Installation
```powershell
# Navigate to the Exp6 folder
cd Exp6

# No npm install needed - uses only built-in Node.js modules

# Start the server
npm start
# OR
node server.js
```

### Accessing the Server
Once started, open your browser and navigate to:
- **Home Page**: http://localhost:3000
- **About Page**: http://localhost:3000/about.html
- **Test 404**: http://localhost:3000/nonexistent.html

## Project Structure
```
Exp6/
├── server.js           # Main server file
├── package.json        # NPM configuration
├── public/             # Static files directory
│   ├── index.html      # Home page
│   ├── about.html      # About page
│   ├── styles.css      # Stylesheet
│   └── script.js       # Client-side JavaScript
└── README.md           # Documentation
```

## Implementation Details

### Core Modules Used
1. **`http`**: Create the web server
2. **`fs`**: Read files from the file system
3. **`path`**: Handle file paths

### Server Features

#### 1. **HTTP Server Creation**
```javascript
const server = http.createServer((req, res) => {
    // Handle incoming requests
});
```

#### 2. **File Serving**
- Maps URL to file path
- Reads file from disk using `fs.readFile()`
- Sends file content in response

#### 3. **MIME Type Detection**
Automatically sets correct `Content-Type` header based on file extension:
- `.html` → `text/html`
- `.css` → `text/css`
- `.js` → `text/javascript`
- `.png`, `.jpg` → `image/png`, `image/jpeg`
- etc.

#### 4. **Error Handling**
- **404 Not Found**: Custom HTML error page when file doesn't exist
- **500 Server Error**: Handles file read errors gracefully
- **Security**: Prevents directory traversal attacks

#### 5. **Request Logging**
Logs every request with timestamp, method, URL, and status code:
```
[2024-10-17T10:30:45.123Z] GET / - 200
[2024-10-17T10:30:46.456Z] GET /styles.css - 200
[2024-10-17T10:30:50.789Z] GET /nonexistent.html - 404
```

#### 6. **Caching Headers**
Sets `Cache-Control` header to improve performance:
```javascript
'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
```

#### 7. **Directory Index**
Automatically serves `index.html` when requesting a directory

#### 8. **Graceful Shutdown**
Handles SIGINT (Ctrl+C) for clean server shutdown

## Key Concepts Demonstrated

### 1. HTTP Request/Response Cycle
```javascript
// Request object contains:
req.url      // Requested URL path
req.method   // HTTP method (GET, POST, etc.)
req.headers  // Request headers

// Response object allows:
res.writeHead(statusCode, headers)  // Set status and headers
res.end(data)                       // Send response and end
```

### 2. File System Operations
```javascript
// Check if file exists
fs.stat(filePath, callback)

// Read file content
fs.readFile(filePath, callback)
```

### 3. Path Manipulation
```javascript
path.join(__dirname, 'public')    // Build file paths
path.extname(filePath)            // Get file extension
```

### 4. Asynchronous Programming
All file operations use callbacks to avoid blocking:
```javascript
fs.readFile(filePath, (err, data) => {
    if (err) {
        // Handle error
    } else {
        // Send file
    }
});
```

## How It Works

### Request Flow
1. Client requests URL (e.g., `/about.html`)
2. Server receives request and parses URL
3. Server maps URL to file path (`public/about.html`)
4. Server checks if file exists using `fs.stat()`
5. If exists, server reads file using `fs.readFile()`
6. Server determines MIME type from file extension
7. Server sends response with appropriate headers
8. Request is logged to console

### Response Headers
```javascript
{
    'Content-Type': 'text/html',           // MIME type
    'Cache-Control': 'public, max-age=3600', // Caching
    'Content-Length': 1024                  // File size
}
```

## Testing the Server

### Test Cases
1. **Valid HTML file**: http://localhost:3000/ → 200 OK
2. **Valid CSS file**: http://localhost:3000/styles.css → 200 OK
3. **Valid JS file**: http://localhost:3000/script.js → 200 OK
4. **Non-existent file**: http://localhost:3000/fake.html → 404 Not Found
5. **Directory**: http://localhost:3000/ → Serves index.html

## Observations

### Strengths
- ✅ **Simple**: Uses only built-in Node.js modules
- ✅ **Educational**: Shows HTTP fundamentals clearly
- ✅ **Lightweight**: No external dependencies
- ✅ **Transparent**: Complete control over request/response handling

### Limitations
- ❌ **No built-in routing**: Must handle all URL parsing manually
- ❌ **Manual MIME handling**: Need to maintain MIME type mappings
- ❌ **Limited features**: No compression, no advanced caching
- ❌ **Not production-ready**: Missing many features required for real applications

### Production Considerations
For real-world applications, use:
- **Express.js**: Web framework with routing, middleware
- **Nginx/Apache**: Production-grade static file servers
- **CDN**: For serving static assets at scale

## Security Features

### 1. Directory Traversal Prevention
```javascript
// Prevents accessing files outside public directory
if (!fullPath.startsWith(PUBLIC_DIR)) {
    return send404(res, req);
}
```

### 2. Input Sanitization
- Removes query strings from URLs
- Validates file paths before reading

## Performance Optimization

### 1. Caching Headers
Tells browsers to cache files for 1 hour, reducing server load

### 2. Content-Length Header
Allows browsers to show download progress

## Error Handling

### 1. File Not Found (404)
- Custom HTML error page
- Links back to home page
- Logs error

### 2. Server Error (500)
- Displays error message
- Logs error details
- Returns 500 status code

### 3. Port Already in Use
- Detects `EADDRINUSE` error
- Provides helpful error message
- Exits gracefully

## Conclusion
This experiment successfully demonstrates how to build a basic HTTP server using Node.js's built-in modules. It covers essential concepts including:
- HTTP request/response handling
- File system operations
- MIME type detection
- Error handling
- Logging
- Security basics

While suitable for learning and development, production applications should use robust frameworks like Express.js or dedicated static file servers for better performance, security, and feature set. This server provides a solid foundation for understanding how web servers work at a fundamental level.

## Next Steps
- Add support for more MIME types
- Implement request body parsing for POST requests
- Add middleware pattern
- Implement routing
- Add compression (gzip)
- Implement better caching strategies
- Add HTTPS support
- Create API endpoints
