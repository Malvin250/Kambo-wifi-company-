# Kambo WiFi - Installation & Setup Guide

## System Requirements

- Node.js v14 or higher
- MongoDB v4.4 or higher
- npm or yarn
- 2GB RAM minimum
- Internet connection

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Malvin250/Kambo-wifi-company-.git
cd Kambo-wifi-company-
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Setup Backend Server

```bash
cd server
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kambo-wifi
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
MPESA_API_KEY=your_mpesa_api_key
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORT_CODE=123456
MPESA_PASS_KEY=your_pass_key
```

### 4. Setup Frontend

```bash
cd ../client
npm install
```

Create `.env` file:
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 5. Start MongoDB

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in server/.env
```

### 6. Run the Application

From the root directory:

```bash
npm run dev
```

Or run separately:

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Creating Test Accounts

### Customer Account

1. Go to http://localhost:3000/register
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: 254712345678
   - Password: Password123
3. Click "Create Account"

### Admin Account

For testing admin features, you need to create an admin user in MongoDB:

```bash
# Connect to MongoDB
mongosh

# Use the database
use kambo-wifi

# Create admin user
db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com",
  phone: "254712345678",
  password: "$2a$10$...", // Use bcrypt to hash password
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the register endpoint with a special role:

1. Register a customer first
2. Modify the user in MongoDB to set role to "admin"

## Verification Checklist

- [ ] MongoDB is running
- [ ] Node.js and npm are installed
- [ ] Backend server starts without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Can register a new account
- [ ] Can login to dashboard
- [ ] API health check passes

## Troubleshooting

### Issue: MongoDB Connection Error
**Solution:**
- Ensure MongoDB is running: `mongosh` (should connect)
- Check MongoDB URI in `.env`
- For MongoDB Atlas, whitelist your IP

### Issue: Port 3000 or 5000 Already in Use
**Solution:**
```bash
# Kill process on port
lsof -ti:3000 | xargs kill -9  # for port 3000
lsof -ti:5000 | xargs kill -9  # for port 5000
```

### Issue: Dependencies Not Installing
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS Errors in Browser Console
**Solution:**
- Verify `REACT_APP_API_URL` matches backend URL
- Ensure backend CORS is configured correctly
- Check browser console for specific error messages

### Issue: Cannot Login
**Solution:**
- Verify user exists in MongoDB
- Check password is correct
- Look for errors in backend console
- Clear browser localStorage: `localStorage.clear()`

## Performance Optimization

### Frontend
- Build: `npm run build` (creates optimized production build)
- Minification and code splitting is automatic

### Backend
- Use MongoDB indexes for frequently queried fields
- Implement caching for package data
- Use pagination for large result sets

## Next Steps

1. Customize the application (colors, branding, etc.)
2. Integrate real M-Pesa payment gateway
3. Add email notifications
4. Deploy to production
5. Setup CI/CD pipeline

## Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## Support & Issues

If you encounter any issues:

1. Check the troubleshooting section
2. Review error messages in console
3. Create an issue on GitHub
4. Contact support@kambowifi.com

## License

MIT License - See LICENSE file
