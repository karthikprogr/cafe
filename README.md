# Venissa Cafe & Kitchen 🍵

> **Premium cafe website for Venissa Cafe & Kitchen, LB Nagar, Hyderabad — built with React + Tailwind + Framer Motion + Node.js + MongoDB**

---

## 🚀 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 (Vite) | Component framework |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| React Hot Toast | Notifications |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT | Admin authentication |
| Razorpay SDK | Payment processing |
| bcryptjs | Password hashing |
| dotenv | Environment config |

---

## 📁 Project Structure

```
venissa-cafe/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      ← Sticky nav with cart icon
│   │   │   ├── Hero.jsx        ← Full-screen hero section
│   │   │   ├── MenuCard.jsx    ← Animated menu item card
│   │   │   ├── Cart.jsx        ← Slide-in cart panel
│   │   │   ├── Reviews.jsx     ← Customer review cards
│   │   │   ├── BookingForm.jsx ← Table reservation form
│   │   │   ├── InstagramFeed.jsx ← Gallery grid section
│   │   │   ├── Chatbot.jsx     ← AI menu chatbot
│   │   │   └── Footer.jsx      ← Footer with social links
│   │   ├── pages/
│   │   │   ├── Home.jsx        ← Landing page
│   │   │   ├── Menu.jsx        ← Full menu with filters
│   │   │   ├── Order.jsx       ← Cart + checkout flow
│   │   │   ├── Booking.jsx     ← Table booking page
│   │   │   ├── Reviews.jsx     ← Reviews page
│   │   │   └── Admin.jsx       ← Admin dashboard
│   │   ├── context/
│   │   │   └── CartContext.jsx ← Cart state management
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
└── backend/
    ├── models/
    │   ├── MenuItem.js
    │   ├── Order.js
    │   └── Booking.js
    ├── routes/
    │   ├── menuRoutes.js
    │   ├── orderRoutes.js
    │   ├── bookingRoutes.js
    │   ├── paymentRoutes.js
    │   └── authRoutes.js
    ├── middleware/
    │   └── auth.js
    ├── server.js
    ├── package.json
    └── .env
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Razorpay account (for payments)

### 1. Clone & Install

```bash
# Install frontend dependencies
cd venissa-cafe/frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/venissa-cafe
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_secure_jwt_secret
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=venissa@admin2024
```

**Frontend `.env`:**
```env
VITE_RAZORPAY_KEY=rzp_test_xxxxxxxxxx
VITE_API_URL=http://localhost:5000
```

### 3. Run the App

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

Frontend runs at: **http://localhost:3000**  
Backend API at: **http://localhost:5000**

---

## 🌐 Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, Featured Menu, About, Reviews, Gallery, Map |
| `/menu` | Full Menu — search, filter by category, sort |
| `/order` | Cart & Checkout — Razorpay / Cash on delivery |
| `/booking` | Table Booking Form |
| `/reviews` | Customer Reviews with rating breakdown |
| `/admin` | Admin Dashboard (login required) |

---

## 🔐 Admin Dashboard

Access at `/admin`  
Default credentials:  
- **Username:** `admin`  
- **Password:** `venissa@admin2024`

**Admin Features:**
- View real-time stats (revenue, orders, bookings, menu count)
- Add / Edit / Delete menu items
- View and update order statuses
- View all table bookings

---

## 💳 Payment Integration

Integrated with **Razorpay** for secure payments.

1. Get API keys from [razorpay.com/dashboard](https://razorpay.com/dashboard)
2. Add keys to backend `.env` and frontend `.env`
3. Test using Razorpay test mode credentials

---

## 🤖 AI Chatbot

The built-in chatbot (`/src/components/Chatbot.jsx`) recognizes:
- Greetings → Welcome message
- "coffee", "cappuccino", "cold brew" → Coffee recommendations
- "pizza" → Pizza options with prices
- "pasta" → Pasta recommendations
- "dessert", "cake" → Dessert suggestions
- "milkshake" → Shake menu
- "recommend" → Today's top picks
- "location", "address" → Cafe location info
- "hours", "open" → Timing info

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Gold | `#D4A853` |
| Gold Light | `#F5C842` |
| Background (dark) | `#0a0a0a` |
| Surface | `rgba(255,255,255,0.04)` |
| Border | `rgba(255,255,255,0.08)` |
| Font: Body | Inter |
| Font: Display | Playfair Display |

---

## 📡 API Endpoints

### Menu
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/menu` | — | Get all menu items |
| POST | `/api/menu` | Admin | Add item |
| PUT | `/api/menu/:id` | Admin | Update item |
| DELETE | `/api/menu/:id` | Admin | Delete item |

### Orders
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/orders` | — | Place order |
| POST | `/api/orders/verify-payment` | — | Verify Razorpay payment |
| GET | `/api/orders` | Admin | All orders |
| PUT | `/api/orders/:id` | Admin | Update status |

### Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/bookings` | — | Create booking |
| GET | `/api/bookings` | Admin | All bookings |
| PUT | `/api/bookings/:id` | Admin | Update booking |

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Admin login → JWT token |

---

## 📍 Cafe Info

**Venissa Cafe & Kitchen**  
Saradhi Nagar, LB Nagar  
Hyderabad, Telangana — 500074  

📞 +91 98765 43210  
📧 hello@venissacafe.com  
🕐 Open: 8:00 AM – 11:00 PM (Daily)  
📱 @venissacafe

---

## 🙏 Credits

Design inspired by **Starbucks** and **Blue Tokai Coffee** — built with ❤️ for Hyderabad.
