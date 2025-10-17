const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types mapping
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain',
    '.pdf': 'application/pdf'
};

// Get MIME type based on file extension
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}

// Log request details
function logRequest(req, statusCode) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${statusCode}`);
}

// Handle 404 errors
function send404(res, req) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>404 - Not Found</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                h1 { font-size: 72px; margin: 0; }
                p { font-size: 24px; }
                a { color: white; text-decoration: underline; }
            </style>
        </head>
        <body>
            <h1>404</h1>
            <p>File Not Found</p>
            <p>The requested file "${req.url}" does not exist.</p>
            <a href="/">Go to Home</a>
        </body>
        </html>
    `);
    logRequest(req, 404);
}

// Handle 500 errors
function send500(res, req, error) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>500 - Server Error</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background: #e74c3c;
                    color: white;
                }
                h1 { font-size: 72px; margin: 0; }
                p { font-size: 24px; }
            </style>
        </head>
        <body>
            <h1>500</h1>
            <p>Internal Server Error</p>
            <p>${error.message}</p>
        </body>
        </html>
    `);
    logRequest(req, 500);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse URL and get file path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Remove query string
    filePath = filePath.split('?')[0];
    
    // Build full file path
    const fullPath = path.join(PUBLIC_DIR, filePath);
    
    // Security check: prevent directory traversal
    if (!fullPath.startsWith(PUBLIC_DIR)) {
        send404(res, req);
        return;
    }

    // Check if file exists
    fs.stat(fullPath, (err, stats) => {
        if (err) {
            // File not found
            send404(res, req);
            return;
        }

        // If it's a directory, try to serve index.html
        if (stats.isDirectory()) {
            const indexPath = path.join(fullPath, 'index.html');
            fs.stat(indexPath, (err, stats) => {
                if (err) {
                    send404(res, req);
                } else {
                    serveFile(indexPath, res, req);
                }
            });
            return;
        }

        // Serve the file
        serveFile(fullPath, res, req);
    });
});

// Function to serve a file
function serveFile(filePath, res, req) {
    // Read file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            send500(res, req, err);
            return;
        }

        // Get MIME type
        const mimeType = getMimeType(filePath);
        
        // Set headers
        res.writeHead(200, {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            'Content-Length': data.length
        });

        // Send file content
        res.end(data);
        logRequest(req, 200);
    });
}

// Start server
server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${PUBLIC_DIR}`);
    console.log('='.repeat(50));
    console.log('\nPress Ctrl+C to stop the server\n');
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Error: Port ${PORT} is already in use.`);
        console.error('Please close the other application or use a different port.');
    } else {
        console.error('❌ Server error:', err.message);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});
