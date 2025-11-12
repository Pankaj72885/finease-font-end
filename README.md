# 💰 FinEase - Personal Finance Management App (Frontend)

FinEase is a modern **personal finance management web app** that helps users manage income, expenses, and savings goals with a clean, responsive dashboard and insightful data visualizations.

🌐 **Live Demo:** [https://finease-font-end.vercel.app/](https://finease-font-end.vercel.app/)

---

## 🚀 Features

- 🔐 **Authentication System**
  - Email/Password & Google Login (Firebase)
  - Protected routes & profile management

- 💸 **Transaction Management (CRUD)**
  - Add, edit, delete, and view income/expense transactions
  - Category-based filtering and sorting

- 📊 **Financial Reports**
  - Interactive Pie & Bar charts using **Recharts**
  - Monthly summaries and category-wise spending

- 🌗 **Modern UI/UX**
  - Built with **TailwindCSS** + **shadcn/ui**
  - Light/Dark mode with Theme Context
  - Fully responsive (mobile → desktop)

- 🧭 **Routing**
  - React Router v7.x for seamless SPA navigation

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | React 19.x (Vite) |
| Styling | TailwindCSS + shadcn/ui |
| Authentication | Firebase SDK |
| State Management | TanStack Query (React Query) |
| Charts | Recharts |
| Utilities | date-fns, react-hot-toast, SweetAlert2 |
| Deployment | Vercel |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://finease-back-end.vercel.app/api
```

---

## 🧩 Project Structure

```
src/
 ┣ components/
 ┣ contexts/
 ┣ pages/
 ┣ hooks/
 ┣ routes/
 ┗ App.jsx
```

---

## 🧪 Local Setup

```bash
# 1️⃣ Clone repo
git clone https://github.com/Pankaj72885/finease-font-end.git

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start dev server
npm run dev
```

Access the app at:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🔗 Related

Backend Repository → [FinEase Backend](https://github.com/Pankaj72885/finease-back-end)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

### 🧠 Author
**Pankaj Bepari**

-   **GitHub:** [@Pankaj72885](https://github.com/Pankaj72885)
-   **LinkedIn:** [Pankaj Bepari](bd.linkedin.com/in/pankaj-bepari-8aa69013a)


