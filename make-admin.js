/**
 * Script to make a user admin
 * 
 * Usage: node make-admin.js user-email@example.com
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Import User model (simplified version for script)
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  image: String,
  phone: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model('User', UserSchema);

async function makeAdmin(email) {
  try {
    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.error(`❌ User with email "${email}" not found`);
      console.log('\n💡 Tip: Make sure the user has registered first at http://localhost:3000/register');
      process.exit(1);
    }

    // Check if already admin
    if (user.isAdmin) {
      console.log(`✅ User "${email}" is already an admin`);
      process.exit(0);
    }

    // Update to admin
    user.isAdmin = true;
    await user.save();

    console.log(`✅ Success! User "${email}" is now an admin`);
    console.log('\n📝 Next steps:');
    console.log('1. Logout from the app (if logged in)');
    console.log('2. Login again with your credentials');
    console.log('3. You should see admin tabs: Categories, Menu Items, Users');
    console.log('4. Visit http://localhost:3000/categories to test');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error('❌ Error: Email is required');
  console.log('\nUsage: node make-admin.js your-email@example.com');
  process.exit(1);
}

// Validate email format (basic)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error('❌ Error: Invalid email format');
  process.exit(1);
}

// Run the script
makeAdmin(email);

