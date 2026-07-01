# Kambo WiFi Company

A modern WiFi management and package sales platform built with React, Node.js, Express, and MongoDB.

## Features

### Customer Features
- **User Registration & Authentication**: Secure signup and login
- **Dashboard**: View active sessions and usage statistics
- **WiFi Packages**: Browse and purchase WiFi packages
- **Voucher Management**: Activate and manage WiFi vouchers
- **Payment Integration**: M-Pesa payment integration (placeholder)
- **User Profile**: Manage personal information
- **Session History**: Track WiFi usage history
- **Mobile Responsive**: Fully responsive design for all devices

### Admin Features
- **Admin Dashboard**: Overview of platform statistics
- **User Management**: Manage customer accounts
- **Package Management**: Create and manage WiFi packages
- **Voucher Management**: Generate and track vouchers
- **Payment Management**: View and manage transactions
- **Reports**: Generate usage and revenue reports
- **System Settings**: Configure platform settings

### Technology Stack
- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Database**: MongoDB
- **Payment**: M-Pesa API (placeholder)
- **Deployment Ready**: Configured for production deployment

## Project Structure

```
kambo-wifi/
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration

5. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The client will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user details (admin)
- `GET /api/users` - List all users (admin)
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package details
- `POST /api/packages` - Create package (admin)
- `PUT /api/packages/:id` - Update package (admin)
- `DELETE /api/packages/:id` - Delete package (admin)

### Vouchers
- `GET /api/vouchers` - Get user vouchers
- `POST /api/vouchers/generate` - Generate vouchers (admin)
- `POST /api/vouchers/activate` - Activate voucher
- `GET /api/vouchers/:code` - Get voucher details
- `PUT /api/vouchers/:id` - Update voucher (admin)

### Payments
- `POST /api/payments/mpesa` - Initiate M-Pesa payment
- `POST /api/payments/callback` - M-Pesa payment callback
- `GET /api/payments` - Get payment history
- `GET /api/payments/:id` - Get payment details

### Sessions
- `GET /api/sessions` - Get user sessions
- `GET /api/sessions/:id` - Get session details
- `POST /api/sessions/start` - Start WiFi session
- `POST /api/sessions/end` - End WiFi session

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/reports` - Generate reports
- `GET /api/admin/settings` - Get system settings
- `PUT /api/admin/settings` - Update system settings

## Environment Variables

See `.env.example` for all required environment variables.

## Usage

1. **Register**: Create a new customer account
2. **Login**: Access your dashboard
3. **Browse Packages**: View available WiFi packages
4. **Purchase**: Buy a package using M-Pesa payment
5. **Activate Voucher**: Use your voucher code to connect
6. **Monitor Usage**: Track your sessions and data usage

## Admin Access

1. Navigate to `/admin/login`
2. Use admin credentials
3. Access admin dashboard at `/admin/dashboard`

## Development

### Running Tests
```bash
npm test
```

### Building for Production

#### Backend
```bash
cd server
npm run build
npm start
```

#### Frontend
```bash
cd client
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT

## Support

For support, email support@kambowifi.com or open an issue on GitHub.
