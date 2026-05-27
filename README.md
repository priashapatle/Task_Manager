# Cross-Platform Task Manager App 🚀

A high-fidelity, interactive full-stack Task Management application designed for seamless cross-platform performance (Android, iOS, and Web). This project showcases a robust state-driven UI built with **React / React Native**, styled with **Tailwind CSS**, and architected to interface with a **Node.js, Express, and MongoDB (MERN)** backend using global **Redux Toolkit** state management and secure **JWT-based authentication**.

---

## Live Demo -
https://task-manager-alpha-ivory.vercel.app/

---

## 📱 App Live Preview & Deployment
The frontend prototype has been successfully compiled and deployed live. 
**Deployment Platform:** Vercel
**Continuous Integration:** Automated via GitHub Actions on `git push`

---

## 🛠 Tech Stack & Architecture

### Frontend Ecosystem
**Framework:** React Native / React (Expo CLI optimized) 
**State Management:** Redux Toolkit (RTK) with Slice-based architecture
**Styling Engine:** Tailwind CSS / NativeWind
**Iconography:** Lucide React / Vector Icons

### Backend Ecosystem 
**Runtime:** Node.js
**Framework:** Express.js (RESTful API Design)
**Database:** MongoDB Atlas (NoSQL Document Store)
**ODM:** Mongoose (Schema validation & relational mapping)
**Security:** JSON Web Tokens (JWT) & bcryptjs password hashing

---

## 📐 System Core Concepts & Data Flow

### 1. Global State Management (Redux Flow)
The app uses a unidirectional data flow pattern via Redux Toolkit to mitigate prop-drilling across deep component trees.

```text
[ UI Component (Task Card) ] 
       │
       ▼ (User clicks Checkbox)
[ Dispatch Action: toggleTask(id) ]
       │
       ▼
[ Redux Store / taskSlice Reducer ] ──▶ (Mutates State Immutably)
       │
       ▼
[ Selector Hooks re-render UI ] ──▶ Updates Progress Card Meter (%)
```

### 2. Authentication & Security Handshake
Authentication is stateless and handled via token verification:

```text
┌───────────┐                Credentials                ┌─────────────┐
│           │──────────────────────────────────────────▶│             │
│   React   │                                           │   Express   │
│  Native   │◀──────────────────────────────────────────│   Backend   │
│  Client   │         JWT Issued (Signed Secret)        │  & MongoDB  │
└───────────┘                                           └─────────────┘
      │
      ▼
Stored Securely 
(AsyncStorage / Expo Secure Store)
      │
      ▼
Attached to Axios Headers automatically 
for subsequent CRUD requests: `Authorization: Bearer <token>`
```

---

## 💾 Database Model & Schemas (Mongoose)

### User Schema (`models/User.js`)
```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
```

### Task Schema (`models/Task.js`)
```javascript
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Work', 'Personal', 'Health & Fitness', 'Study'], default: 'Work' },
  time: { type: String, required: true },
  date: { type: String, required: true }, 
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
```

---

## ⚡ Key Features Implemented

**Dynamic Dashboard View:** Real-time statistics computing completion percentages dynamically driven by Redux state mutations.
**Interactive Tab Navigation:** Seamless screen transformations without page reloads.
**Advanced Analytics Panel (Insights):** Complete implementation of custom data structures represented via responsive UI blocks.
**Task Lifecycle Management (CRUD):** Interactive modal form engine to inject new entities into the state array dynamically, and a deep-dive `TaskDetails` view fetching context-specific attributes.

---

## 📦 Local Installation & Setup

### Prerequisites
Node.js (v16.x or higher)
npm or yarn

### Steps
1. Clone the repository: `git clone <your-repository-url>` and `cd task-manager-app`
2. Install dependencies: `npm install`
3. Run the local development server: `npm run dev`

---

## 👤 Developer Profile
**Priasha Patle** Pursuing B.Tech in Computer Science and Engineering | Google Student Ambassador 
**Core Expertise:** React Native, Node.js, Express.js, MongoDB, Python, SQL, Redux Toolkit, Data Structures, Google Cloud (Vertex AI, BigQuery)
