# Environment Variables Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory (`food-ordering-app-main`) with the following variables:

### Essential (Required to run the app):
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/food-ordering-app
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database-name

# NextAuth Configuration
SECRET=your-secret-key-here-generate-a-random-string
NEXTAUTH_URL=http://localhost:3000
```

### Optional (For full functionality):
```env
# Google OAuth (for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRECT=your-cloudinary-api-secret

# Stripe (for payment processing)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_SIGNING_SECRET=whsec_your-stripe-webhook-signing-secret
```

## Quick Setup Steps:

1. **Generate a SECRET**: Run this command to generate a random secret:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. **Set up MongoDB**:
   - Option A: Install MongoDB locally
   - Option B: Use MongoDB Atlas (free tier available at https://www.mongodb.com/cloud/atlas)

3. **Create `.env.local` file** in the root directory with at minimum:
   - `MONGODB_URI`
   - `SECRET`
   - `NEXTAUTH_URL=http://localhost:3000`

## Notes:
- The app will work with just MongoDB, SECRET, and NEXTAUTH_URL
- Other services (Google OAuth, Cloudinary, Stripe) are optional but needed for those specific features
- For local development, `NEXTAUTH_URL` should be `http://localhost:3000`

