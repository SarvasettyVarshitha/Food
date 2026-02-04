# EcoFood Manager - Smart Hostel Food Waste Reduction

A modern single-page web application for managing hostel food tracking and reducing waste through intelligent analytics.

## Features
- **Food Entry Recording**: Track food waste with detailed information
- **Real-time Analytics**: View comprehensive statistics and insights
- **Modern UI**: Premium design with colorful gradients and animations
- **Responsive Design**: Works seamlessly on all devices
- **Photo Upload**: Optional image capture for waste entries

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas Account

## Setup Instructions

### 1. Configure Backend
Open `server/.env` and add your MongoDB connection:
```env
MONGDB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-waste?retryWrites=true&w=majority
PORT=5000
```

### 2. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Seed Database (Optional)
```bash
cd server
node seed.js
```

## Running the Application

### Start Backend Server
```bash
cd server
npm run dev
```
Server runs on: http://localhost:5000

### Start Frontend Client
```bash
cd client
npm run dev
```
Client runs on: http://localhost:5173

## Application Sections

### 🏠 Home
- Dashboard with key statistics
- Analytics overview
- Performance metrics

### 📝 Record
- Food entry form
- Photo upload capability
- Reason tracking (Leftover, Overcooked, Other)

### 👥 About Us
- Mission and vision
- Feature highlights
- Smart tracking capabilities

### 📞 Contact
- **Email**: mahaswarup19082001@gmail.com
- **Phone**: +91 7569981071
- **Address**: SLN Charities, KR Road, Near Fort, Bangalore - 02

## Technology Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **File Upload**: Multer
- **Icons**: Lucide React

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── uploads/           # File uploads
│   ├── server.js          # Server entry point
│   └── package.json
└── README.md
```

## API Endpoints
- `POST /api/waste` - Create new food entry
- `GET /api/analytics` - Get analytics data

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
© 2024 EcoFood Manager - Transforming hostel sustainability
