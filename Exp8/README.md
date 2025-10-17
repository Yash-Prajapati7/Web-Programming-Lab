# Experiment 8 - Student Database REST API with MongoDB & Node-RED

## Aim
Create a Student database application to build a RESTful API using MongoDB where one entity is captured using hardware to demonstrate the connection of Node-RED with MongoDB.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally OR MongoDB Atlas account
- Node-RED installed globally (`npm install -g node-red`)
- Postman or similar API testing tool (optional)

## Setup Instructions

### 1. Install Dependencies
```powershell
cd Exp8
npm install
```

### 2. Setup MongoDB

#### Option A: Local MongoDB
```powershell
# Start MongoDB service
mongod

# Or on Windows (if installed as service):
net start MongoDB
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file with your connection string

### 3. Configure Environment
```powershell
# Copy example environment file
copy .env.example .env

# Edit .env and update MongoDB URI if needed
```

### 4. Start the API Server
```powershell
npm start

# Or for development with auto-reload:
npm run dev
```

Server will start on: http://localhost:5000

### 5. Setup Node-RED

#### Install Node-RED (if not installed)
```powershell
npm install -g node-red
```

#### Start Node-RED
```powershell
node-red
```

Node-RED editor will be available at: http://localhost:1880

#### Import Flow
1. Open Node-RED editor (http://localhost:1880)
2. Click menu (☰) → Import
3. Select the `node-red-flows.json` file
4. Click "Import"
5. Click "Deploy"

## Project Structure
```
Exp8/
├── server.js                # Main Express server with REST API
├── package.json             # Dependencies
├── .env.example             # Environment variables template
├── node-red-flows.json      # Node-RED flow configuration
└── README.md                # Documentation
```

## Student Schema

```javascript
{
    rollNumber: String (unique, required),
    name: String (required),
    email: String (unique, required, validated),
    phone: String (required, 10 digits),
    department: String (required, enum),
    year: Number (required, 1-4),
    cgpa: Number (required, 0-10),
    hardwareData: {
        deviceId: String,
        timestamp: Date,
        location: String,
        rfidTag: String
    },
    createdAt: Date,
    updatedAt: Date
}
```

## REST API Endpoints

### 1. Get All Students
```
GET /api/students
```

**Response:**
```json
{
    "success": true,
    "count": 10,
    "data": [...]
}
```

### 2. Get Student by ID
```
GET /api/students/:id
```

### 3. Create New Student
```
POST /api/students
Content-Type: application/json

{
    "rollNumber": "CS2021001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "department": "CSE",
    "year": 2,
    "cgpa": 8.5
}
```

### 4. Update Student
```
PUT /api/students/:id
Content-Type: application/json

{
    "cgpa": 9.0
}
```

### 5. Delete Student
```
DELETE /api/students/:id
```

### 6. Get Students by Department
```
GET /api/students/department/CSE
```

### 7. Search Students
```
GET /api/students/search/john
```

### 8. Hardware Capture (Node-RED Integration)
```
POST /api/hardware/capture
Content-Type: application/json

{
    "rollNumber": "CS2021001",
    "deviceId": "DEVICE001",
    "rfidTag": "RFID123456",
    "location": "Main Gate"
}
```

## Node-RED Integration

### Flow Description
The Node-RED flow simulates an IoT-based attendance system:

1. **RFID Reader Node** (Inject): Simulates RFID card scan
2. **Process RFID Data** (Function): Maps RFID tag to student roll number
3. **Send to API** (HTTP Request): Posts data to the REST API
4. **Display Result** (Debug): Shows the API response

### How It Works
1. Student scans RFID card at entrance
2. Hardware device sends RFID data to Node-RED
3. Node-RED processes and sends to MongoDB via REST API
4. System records attendance with timestamp and location

### Testing the Flow
1. Open Node-RED editor (http://localhost:1880)
2. Click the inject button on "Simulate RFID Scan" node
3. Check debug panel for API response
4. Verify data in MongoDB using API endpoint

## Testing with Postman/Thunder Client

### Create a Student
```powershell
POST http://localhost:5000/api/students
Content-Type: application/json

{
    "rollNumber": "CS2021001",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "9876543210",
    "department": "CSE",
    "year": 2,
    "cgpa": 8.5,
    "hardwareData": {
        "rfidTag": "RFID123456"
    }
}
```

### Test Hardware Capture
```powershell
POST http://localhost:5000/api/hardware/capture
Content-Type: application/json

{
    "rollNumber": "CS2021001",
    "deviceId": "DEVICE001",
    "location": "Main Gate"
}
```

## MongoDB Operations

### View Database
```javascript
// In MongoDB shell or Compass
use student_db
db.students.find().pretty()
```

### Sample Queries
```javascript
// Find all CSE students
db.students.find({ department: "CSE" })

// Find students with CGPA > 8
db.students.find({ cgpa: { $gt: 8 } })

// Find recent hardware captures
db.students.find({ 
    "hardwareData.timestamp": { 
        $gte: new Date(Date.now() - 24*60*60*1000) 
    }
})
```

## Features Demonstrated

### 1. RESTful API Design
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Proper HTTP methods and status codes
- ✅ JSON request/response format
- ✅ Error handling

### 2. MongoDB Integration
- ✅ Mongoose ODM
- ✅ Schema validation
- ✅ Unique constraints
- ✅ Timestamps
- ✅ Query operations

### 3. Node-RED Integration
- ✅ HTTP Request nodes
- ✅ Function nodes for data processing
- ✅ Debug nodes for monitoring
- ✅ IoT simulation (RFID reader)

### 4. Hardware Data Capture
- ✅ RFID tag mapping
- ✅ Timestamp recording
- ✅ Location tracking
- ✅ Device identification

## Validation Rules

### Email
- Format: `user@example.com`
- Must be unique

### Phone
- Format: 10 digits
- Example: `9876543210`

### Department
- Allowed: CSE, IT, ECE, EEE, MECH, CIVIL

### CGPA
- Range: 0.0 to 10.0

## Error Handling

### Duplicate Entry
```json
{
    "success": false,
    "error": "Student with this roll number or email already exists"
}
```

### Validation Error
```json
{
    "success": false,
    "error": "Please enter a valid email"
}
```

### Not Found
```json
{
    "success": false,
    "error": "Student not found"
}
```

## Security Considerations

### Current Implementation
- Basic input validation
- CORS enabled
- Schema validation

### Production Enhancements
- Add authentication (JWT)
- Input sanitization
- Rate limiting
- HTTPS
- API key validation

## Use Cases

### 1. Attendance System
- Students scan RFID at entrance
- Node-RED captures and logs entry
- Database updated with timestamp

### 2. Library Access
- RFID-based book checkout
- Track student location
- Record access history

### 3. Lab Access Control
- Grant access based on student data
- Log entry/exit times
- Monitor lab usage

## Troubleshooting

### MongoDB Connection Failed
```
❌ MongoDB connection error: connect ECONNREFUSED
```
**Solution**: Start MongoDB service
```powershell
mongod
```

### Port Already in Use
```
❌ Port 5000 is already in use
```
**Solution**: Change port in `.env` file or kill process on port 5000

### Node-RED Flow Not Working
**Check:**
1. Is the API server running?
2. Is the URL correct in HTTP Request node?
3. Check debug panel for errors

## Observations
- **MongoDB**: NoSQL database provides flexible schema and fast queries
- **Mongoose**: ODM simplifies database operations with schema validation
- **REST API**: Standard interface for CRUD operations
- **Node-RED**: Visual programming makes IoT integration easy
- **Hardware Integration**: Simulates real-world IoT device connectivity

## Conclusion
This experiment successfully demonstrates:
1. Building a RESTful API with Express.js
2. MongoDB database integration with Mongoose
3. Schema design and validation
4. Node-RED flow creation for IoT simulation
5. Hardware data capture (RFID) integration
6. Complete CRUD operations
7. Real-world use case (attendance/access control system)

The combination of Node.js, MongoDB, and Node-RED provides a powerful stack for building IoT-enabled applications with persistent data storage and easy hardware integration.

## Next Steps
- Implement JWT authentication
- Add user roles and permissions
- Create admin dashboard
- Add real RFID hardware integration
- Implement WebSocket for real-time updates
- Add data analytics and reporting
- Deploy to cloud (Heroku, AWS, etc.)
