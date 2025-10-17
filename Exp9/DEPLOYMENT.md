# Deployment Guide - MERN Stack Student Portal

## Prerequisites
- Git installed
- Node.js installed
- MongoDB Atlas account
- Render account (for backend)
- Vercel account (for frontend)

## Step 1: Prepare MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier
   - Select region closest to you
   - Name your cluster (e.g., "StudentPortal")

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `student_admin`
   - Password: Generate secure password
   - User Privileges: Read and Write to any database

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Example: `mongodb+srv://student_admin:<password>@cluster0.xxxxx.mongodb.net/student_portal?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password

## Step 2: Deploy Backend to Render

1. **Push Code to GitHub** (if not already done)
   ```powershell
   cd c:\<path>\WP\Exp9
   git init
   git add .
   git commit -m "Initial commit - MERN Student Portal"
   git branch -M main
   git remote add origin https://github.com/yourusername/student-portal.git
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

4. **Configure Service**
   - **Name**: `student-portal-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://student_admin:yourpassword@cluster0.xxxxx.mongodb.net/student_portal
   JWT_SECRET=your_random_secret_key_minimum_32_characters_long
   NODE_ENV=production
   CLIENT_URL=https://your-app.vercel.app
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://student-portal-api.onrender.com`

## Step 3: Deploy Frontend to Vercel

1. **Update API URL in Client**
   
   Create `client/.env.production`:
   ```env
   REACT_APP_API_URL=https://student-portal-api.onrender.com
   ```

2. **Update vite.config.js**
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3000,
       proxy: {
         '/api': {
           target: process.env.REACT_APP_API_URL || 'http://localhost:5000',
           changeOrigin: true
         }
       }
     }
   })
   ```

3. **Install Vercel CLI**
   ```powershell
   npm install -g vercel
   ```

4. **Deploy to Vercel**
   ```powershell
   cd client
   vercel login
   vercel
   ```
   
   Follow prompts:
   - Set up and deploy: Y
   - Which scope: Your account
   - Link to existing project: N
   - Project name: student-portal
   - Directory: `./`
   - Want to override settings: Y
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Development Command: `npm run dev`

5. **Set Environment Variables on Vercel**
   ```powershell
   vercel env add REACT_APP_API_URL
   # Enter: https://student-portal-api.onrender.com
   ```

6. **Deploy to Production**
   ```powershell
   vercel --prod
   ```

## Step 4: Update Backend CORS

After frontend is deployed, update `CLIENT_URL` in Render:

1. Go to Render Dashboard
2. Select your service
3. Go to "Environment"
4. Update `CLIENT_URL` to your Vercel URL
5. Save changes (will auto-redeploy)

## Step 5: Verify Deployment

1. **Test Backend API**
   ```
   https://student-portal-api.onrender.com/
   ```
   Should show API info

2. **Test Frontend**
   ```
   https://student-portal.vercel.app
   ```
   Should load home page

3. **Test Full Flow**
   - Register a new user
   - Login
   - Create a student
   - Enroll in course
   - Submit feedback
   - View dashboard

## Alternative: Deploy Everything to Render

If you prefer single platform deployment:

1. **Deploy Backend** (as above)

2. **Deploy Frontend as Static Site**
   - Click "New +" → "Static Site"
   - Connect repository
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - Add environment variables

## Troubleshooting

### Backend Issues

**Problem**: MongoDB connection timeout
```
Solution: Check MongoDB Atlas Network Access - ensure 0.0.0.0/0 is whitelisted
```

**Problem**: 502 Bad Gateway on Render
```
Solution: Check logs, ensure PORT is correctly set to 5000
```

**Problem**: CORS errors
```
Solution: Verify CLIENT_URL matches your frontend URL exactly
```

### Frontend Issues

**Problem**: API calls failing
```
Solution: Check REACT_APP_API_URL points to correct backend
```

**Problem**: Build fails
```
Solution: Run `npm run build` locally first to identify issues
```

**Problem**: 404 on refresh
```
Solution: Vercel handles this automatically for SPAs
```

## Cost Estimate

- **MongoDB Atlas**: FREE (512 MB storage)
- **Render Backend**: FREE (750 hours/month, sleeps after 15 min inactivity)
- **Vercel Frontend**: FREE (100 GB bandwidth/month)

**Total: $0/month** for hobby projects!

## Production Optimization

1. **Enable Compression** (add to server.js):
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Rate Limiting**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   app.use('/api/', limiter);
   ```

3. **Enable HTTPS** (automatically handled by Render and Vercel)

4. **Add Logging** (consider Winston or Morgan)

5. **Implement Caching** (Redis on paid plans)

## Monitoring

1. **Render Dashboard**: Monitor backend performance
2. **Vercel Analytics**: Track frontend usage
3. **MongoDB Atlas Metrics**: Database performance


## Conclusion

Your MERN stack application is now live and accessible worldwide! 🎉

**Live URLs:**
- Frontend: https://student-portal.vercel.app
- Backend: https://student-portal-api.onrender.com

Share these URLs in your project documentation!

