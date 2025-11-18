# How to Create an Admin User

## Current Situation

By default, **all new users are created as regular users** (`isAdmin: false`). The registration form doesn't allow you to sign up as admin directly.

## Solution: Make a User Admin After Registration

You have **3 options** to create an admin user:

---

## Option 1: Using MongoDB Directly (Recommended)

### Step 1: Register a Regular User
1. Go to: http://localhost:3000/register
2. Sign up with your email and password
3. Note your email address

### Step 2: Update User in MongoDB

**If using MongoDB Atlas (Cloud):**
1. Go to https://cloud.mongodb.com
2. Log in to your account
3. Select your cluster
4. Click "Browse Collections"
5. Find your database (usually `food-ordering-app` or similar)
6. Open the `users` collection
7. Find your user by email
8. Click "Edit Document"
9. Find the `isAdmin` field
10. Change `false` to `true`
11. Click "Update"

**If using Local MongoDB:**
1. Open MongoDB Compass or MongoDB Shell
2. Connect to your database
3. Navigate to your database → `users` collection
4. Find your user document
5. Update `isAdmin` from `false` to `true`

### Step 3: Logout and Login Again
1. Logout from the app
2. Login again with your credentials
3. You should now see admin tabs!

---

## Option 2: Using a Script (Easier)

I've created a script for you. See `make-admin.js` file.

**Steps:**
1. Open terminal in project root
2. Run: `node make-admin.js your-email@example.com`
3. The script will update the user to admin
4. Logout and login again

---

## Option 3: Modify Registration (Not Recommended)

You could modify the registration API to accept `isAdmin`, but this is **NOT SECURE** as anyone could sign up as admin.

---

## Quick MongoDB Query

If you're comfortable with MongoDB queries, you can run this:

```javascript
// In MongoDB Shell or Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```

---

## Verify Admin Status

After making yourself admin:
1. Logout and login again
2. Go to: http://localhost:3000/profile
3. You should see admin tabs: **Categories**, **Menu Items**, **Users**
4. Try accessing: http://localhost:3000/categories
5. If it works, you're admin! ✅

---

## Important Notes

- **Always logout and login again** after changing admin status
- The `isAdmin` field is stored in the database
- Only users with `isAdmin: true` can access admin pages
- Admin users can see all orders, manage categories, menu items, and users

