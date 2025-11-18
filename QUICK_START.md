# Quick Start Guide - Run Frontend & Backend

## ⚡ Important: This is a Next.js App!

**You DON'T need to run frontend and backend separately!**

Next.js runs both together with ONE command:
- Frontend (React) → http://localhost:3000
- Backend (API) → http://localhost:3000/api/*

---

## 📋 Step-by-Step Instructions

### Step 1: Open Terminal in Project Folder
```powershell
cd food-ordering-app-main
```

### Step 2: Install Dependencies (First Time Only)
```powershell
npm install
```

### Step 3: Check Environment Variables
Make sure `.env.local` file exists with:
```env
MONGODB_URI=your-mongodb-connection-string
SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Step 4: Start the Server (Frontend + Backend Together)
```powershell
npm run dev
```

### Step 5: Wait for "Ready" Message
You'll see:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
✓ Ready in X.Xs
```

### Step 6: Open Browser
Go to: **http://localhost:3000**

---

## ✅ How to Verify Frontend is Working

1. **Open Browser**: http://localhost:3000
2. **Check Homepage**: Should see the food ordering website
3. **Test Navigation**:
   - Click "Menu" → Should show menu page
   - Click "About" → Should show about page
   - Click "Contact" → Should show contact page

**If you see the website UI, frontend is working! ✅**

---

## ✅ How to Verify Backend is Working

### Method 1: Test API in Browser

Open these URLs in your browser:

1. **Categories API**:
   ```
   http://localhost:3000/api/categories
   ```
   Should show: `[]` (empty array) or JSON with categories

2. **Menu Items API**:
   ```
   http://localhost:3000/api/menu-items
   ```
   Should show: `[]` (empty array) or JSON with menu items

3. **Users API** (requires login):
   ```
   http://localhost:3000/api/users
   ```
   Should show: `[]` (empty array if not logged in as admin)

### Method 2: Check Browser Console (F12)

1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Refresh the page
4. Look for API calls to `/api/*` endpoints
5. Check if they return 200 status (green)

**If APIs return JSON (even empty arrays), backend is working! ✅**

---

## 🔍 Complete API Endpoints List

Test these in your browser:

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/categories` | GET | Get all categories | No |
| `/api/menu-items` | GET | Get all menu items | No |
| `/api/orders` | GET | Get orders | Yes (User) |
| `/api/users` | GET | Get all users | Yes (Admin) |
| `/api/profile` | GET | Get user profile | Yes (User) |
| `/api/auth/[...nextauth]` | GET/POST | Authentication | No |
| `/api/register` | POST | Register user | No |
| `/api/checkout` | POST | Create payment | Yes (User) |
| `/api/upload` | POST | Upload image | Yes (Admin) |
| `/api/webhook` | POST | Stripe webhook | No |

---

## 🧪 Testing Checklist

Use this to verify everything works:

### Frontend Tests:
- [ ] Homepage loads at http://localhost:3000
- [ ] Navigation works (Menu, About, Contact)
- [ ] Pages don't show errors
- [ ] UI elements display correctly

### Backend Tests:
- [ ] `/api/categories` returns JSON
- [ ] `/api/menu-items` returns JSON
- [ ] No 500 errors in terminal
- [ ] MongoDB connection successful (check terminal)

### Full Stack Tests:
- [ ] Can register a new account
- [ ] Can login
- [ ] Can view menu items
- [ ] Can add items to cart (if logged in)

---

## 🐛 Common Issues

### Issue: Port 3000 Already in Use
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: MongoDB Connection Error
- Check `.env.local` has correct `MONGODB_URI`
- Verify MongoDB Atlas cluster is running (if using cloud)

### Issue: Module Not Found
```powershell
# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📝 Summary

**To run the project:**
1. `npm install` (first time)
2. Set up `.env.local` with MongoDB URI, SECRET, NEXTAUTH_URL
3. `npm run dev`
4. Open http://localhost:3000

**That's it!** Both frontend and backend run together! 🎉

