# How to Run the Food Ordering App

## Understanding the Architecture

This is a **Next.js 14 full-stack application**, which means:
- **Frontend**: React components (in `src/app/` and `src/components/`)
- **Backend**: API routes (in `src/app/api/`)
- **Both run together** with a single command: `npm run dev`

You don't need to run frontend and backend separately - Next.js handles both!

---

## Step-by-Step Guide to Run the Project

### Step 1: Verify Prerequisites

1. **Node.js installed** (version 18 or higher)
   ```powershell
   node --version
   ```

2. **npm installed**
   ```powershell
   npm --version
   ```

### Step 2: Install Dependencies (if not already done)

```powershell
npm install
```

### Step 3: Set Up Environment Variables

1. **Check if `.env.local` exists** in the root directory
2. **Ensure it contains at minimum:**
   ```env
   MONGODB_URI=your-mongodb-connection-string
   SECRET=your-random-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Generate a SECRET if needed:**
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

### Step 4: Start the Development Server

```powershell
npm run dev
```

This single command starts:
- ✅ Frontend (React app) on http://localhost:3000
- ✅ Backend (API routes) on http://localhost:3000/api/*

### Step 5: Wait for Compilation

You should see output like:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Ready in 2.3s
```

---

## How to Verify Everything is Working

### ✅ Frontend Verification

1. **Open your browser** and go to: http://localhost:3000
2. **Check if the homepage loads** - You should see the food ordering website
3. **Navigate through pages:**
   - Home page: http://localhost:3000
   - Menu: http://localhost:3000/menu
   - About: http://localhost:3000/about
   - Contact: http://localhost:3000/contact

### ✅ Backend Verification

Test the API endpoints using your browser or a tool like Postman:

1. **Test Categories API:**
   ```
   http://localhost:3000/api/categories
   ```
   Should return JSON (may be empty array `[]` if no categories exist)

2. **Test Menu Items API:**
   ```
   http://localhost:3000/api/menu-items
   ```
   Should return JSON array of menu items

3. **Test Users API (requires admin auth):**
   ```
   http://localhost:3000/api/users
   ```
   Should return JSON (empty array if not authenticated as admin)

### ✅ Database Connection Verification

1. **Check terminal output** for MongoDB connection messages
2. **Look for errors** like:
   - ❌ "MongoServerError" - Database connection issue
   - ❌ "Invalid/Missing environment variable: MONGODB_URI" - Missing env var

### ✅ Authentication Verification

1. **Try to register:**
   - Go to: http://localhost:3000/register
   - Create a test account

2. **Try to login:**
   - Go to: http://localhost:3000/login
   - Login with your credentials

---

## Common Issues and Solutions

### Issue 1: Port 3000 Already in Use

**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
$env:PORT=3001; npm run dev
```

### Issue 2: MongoDB Connection Error

**Solution:**
- Verify `MONGODB_URI` in `.env.local` is correct
- Check if MongoDB Atlas cluster is running (if using cloud)
- Check if local MongoDB is running (if using local)

### Issue 3: Missing Environment Variables

**Solution:**
- Ensure `.env.local` file exists in root directory
- Add missing variables (SECRET, NEXTAUTH_URL, MONGODB_URI)

### Issue 4: Module Not Found Errors

**Solution:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

---

## Testing Checklist

Use this checklist to verify everything works:

- [ ] Server starts without errors
- [ ] Homepage loads at http://localhost:3000
- [ ] Navigation works (menu, about, contact pages)
- [ ] API endpoints return data (check browser console Network tab)
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can view menu items
- [ ] Can add items to cart (if logged in)
- [ ] Database connection successful (no errors in terminal)

---

## Production Build (Optional)

To test production build:

```powershell
# Build the project
npm run build

# Start production server
npm start
```

---

## Additional Commands

```powershell
# Run linter
npm run lint

# Check for TypeScript errors
npx tsc --noEmit
```

---

## Need Help?

- Check terminal output for specific error messages
- Verify all environment variables are set correctly
- Ensure MongoDB is accessible
- Check browser console (F12) for frontend errors

