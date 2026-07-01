# Kambo WiFi - Development Guide

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd kambo-wifi
```

2. **Install root dependencies**
```bash
npm install
```

3. **Setup Backend**
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your configuration
cd ..
```

4. **Setup Frontend**
```bash
cd client
npm install
cd ..
```

### Running the Application

**Development Mode (Both client and server)**
```bash
npm run dev
```

Or run separately:

**Server only**
```bash
cd server
npm run dev
```

**Client only**
```bash
cd client
npm start
```

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## Project Structure

```
kambo-wifi/
├── server/              # Express.js backend
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Express middleware
│   ├── controllers/    # Business logic
│   ├── config/         # Configuration files
│   ├── server.js       # Entry point
│   └── package.json
├── client/             # React frontend
│   ├── src/
│   │   ├── pages/     # Page components
│   │   ├── components/# Reusable components
│   │   ├── layouts/   # Layout components
│   │   ├── hooks/     # Custom hooks
│   │   ├── utils/     # Utility functions
│   │   ├── store/     # State management
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── .env.example        # Environment template
├── .gitignore
├── README.md
└── package.json
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/change-password` - Change password

### Package Endpoints
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package details
- `POST /api/packages` - Create package (Admin)
- `PUT /api/packages/:id` - Update package (Admin)
- `DELETE /api/packages/:id` - Delete package (Admin)

### Voucher Endpoints
- `GET /api/vouchers` - Get user's vouchers
- `GET /api/vouchers/code/:code` - Get voucher details
- `POST /api/vouchers/generate` - Generate vouchers (Admin)
- `POST /api/vouchers/activate` - Activate voucher

### Payment Endpoints
- `GET /api/payments` - Get payment history
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments/mpesa` - Initiate M-Pesa payment
- `POST /api/payments/callback` - M-Pesa callback
- `GET /api/payments/admin/all` - All payments (Admin)

### Session Endpoints
- `GET /api/sessions` - Get user sessions
- `GET /api/sessions/:id` - Get session details
- `POST /api/sessions/start` - Start WiFi session
- `POST /api/sessions/:id/end` - End WiFi session

### Admin Endpoints
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/vouchers` - Get all vouchers
- `GET /api/admin/reports` - Generate reports

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kambo-wifi
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
MPESA_API_KEY=your_mpesa_key
```

### Frontend
Set `REACT_APP_API_URL` in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Features Implemented

### Customer Features
- ✅ User registration and authentication
- ✅ Profile management
- ✅ Package browsing
- ✅ Voucher activation
- ✅ Session history tracking
- ✅ Payment history
- ✅ Dashboard with statistics

### Admin Features
- ✅ User management
- ✅ Package management (CRUD)
- ✅ Voucher generation and management
- ✅ Payment tracking
- ✅ Reports and analytics
- ✅ Dashboard with key metrics

## Technology Stack

### Frontend
- React 18
- Tailwind CSS
- React Router v6
- Axios
- Zustand (State Management)
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt (Password hashing)

## Testing

### Run Tests
```bash
# Server tests
cd server && npm test

# Client tests
cd client && npm test
```

## Building for Production

### Frontend Build
```bash
cd client
npm run build
```

### Backend Preparation
```bash
cd server
npm run build
```

## Deployment

### Deploy to Heroku

1. **Create Heroku app**
```bash
heroku create kambo-wifi
```

2. **Add environment variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
```

3. **Deploy**
```bash
git push heroku main
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network access for MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### CORS Issues
- Check backend CORS configuration
- Verify `REACT_APP_API_URL` matches backend URL

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT License - See LICENSE file for details
