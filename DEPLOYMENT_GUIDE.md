# Deployment Guide - Restaurant Food Ordering App

## Overview

This guide explains how to deploy your frontend and backend separately and connect them.

---

## PART 1: LOCAL DEVELOPMENT (What you have now)

### **How it works locally:**

- Frontend (React + Vite): `http://localhost:3000` or `http://localhost:5173`
- Backend (Node.js): `http://localhost:8080`
- Environment variable: `REACT_APP_API_URL=http://localhost:8080`

### **To run locally:**

**Terminal 1 - Backend:**

```bash
cd food-AppBackend
npm install
npm run dev
# Server runs on http://localhost:8080
```

**Terminal 2 - Frontend:**

```bash
cd food-AppFrontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## PART 2: PRODUCTION DEPLOYMENT

### **Step 1: Deploy Backend First**

Choose ONE of these platforms:

#### **Option A: Deploy to Render (Easiest)**

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in:
   - **Name:** `foodflow-api` (or your choice)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Scroll down to **"Environment"** section
6. Add these environment variables:
   ```
   MONGO_URL=mongodb+srv://pranjaltamta:dGxZA7mM64ZgMRtS@shopit.kozjo.mongodb.net/foodManager
   JWT_SECRET=mysecretvalue
   FRONTEND_URL=[WILL ADD LATER AFTER FRONTEND IS DEPLOYED]
   PORT=10000
   ```
7. Click **"Create Web Service"**
8. Wait for deployment → You'll get a URL like: `https://foodflow-api.render.com`
9. **Save this URL** for Step 4

#### **Option B: Deploy to Railway**

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your repository
4. Click **"Add Variables"** and add:
   ```
   MONGO_URL=your_mongodb_url
   JWT_SECRET=your_secret
   FRONTEND_URL=[Will add later]
   ```
5. Wait for deployment
6. Go to Settings → Copy your **Public Domain** (your backend URL)

---

### **Step 2: Deploy Frontend**

#### **Option A: Deploy to Vercel (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"** → **"Import Git Repository"**
3. Select your GitHub repo → **"Import"**
4. **Root Directory:** `food-AppFrontend`
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. **Environment Variables:** Add:
   ```
   REACT_APP_API_URL=https://foodflow-api.render.com
   ```
   (Use the backend URL from Step 1)
8. Click **"Deploy"**
9. Wait for deployment → You'll get a URL like: `https://foodflow.vercel.app`
10. **Save this URL**

#### **Option B: Deploy to Netlify**

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select GitHub → Select your repository
4. **Base directory:** `food-AppFrontend`
5. **Build command:** `npm run build`
6. **Publish directory:** `dist`
7. Go to **"Site settings"** → **"Build & deploy"** → **"Environment**
8. Add variable:
   ```
   REACT_APP_API_URL=https://foodflow-api.render.com
   ```
9. Deploy

---

### **Step 3: Update Backend with Frontend URL**

Now that frontend is live, update your backend:

**On Render:**

1. Go to your backend service
2. Click **"Environment"**
3. Update `FRONTEND_URL` to your frontend URL (e.g., `https://foodflow.vercel.app`)
4. Service automatically redeploys

**On Railway:**

1. Go to your project
2. Click your backend service
3. Go to **"Variables"**
4. Update `FRONTEND_URL`

---

## PART 3: HOW THEY CONNECT

### **Flow Diagram:**

```
┌─────────────────────┐
│  User's Browser     │
└──────────┬──────────┘
           │ Visits https://foodflow.vercel.app
           ▼
┌─────────────────────────────────────────────┐
│  Frontend (React App on Vercel)             │
│  - Loads from: https://foodflow.vercel.app │
│  - API_URL = https://foodflow-api.render.com│
└──────────┬──────────────────────────────────┘
           │ Makes API request
           │ GET /api/v1/category/getAll
           ▼
┌─────────────────────────────────────────────┐
│  Backend (Node.js on Render)                │
│  - Runs on: https://foodflow-api.render.com│
│  - Connects to MongoDB                      │
│  - Allows CORS from frontend URL            │
└──────────┬──────────────────────────────────┘
           │ Returns data (JSON)
           ▼
┌─────────────────────┐
│  User sees data     │
└─────────────────────┘
```

---

## PART 4: ENVIRONMENT VARIABLES SUMMARY

### **Backend `.env` (in food-AppBackend)**

```
PORT=8080
MONGO_URL=mongodb+srv://pranjaltamta:dGxZA7mM64ZgMRtS@shopit.kozjo.mongodb.net/foodManager
JWT_SECRET=mysecretvalue
FRONTEND_URL=https://foodflow.vercel.app    # ← Update after frontend deployment
```

### **Frontend `.env` (in food-AppFrontend)**

```
REACT_APP_API_URL=https://foodflow-api.render.com   # ← Backend URL from Step 1
```

---

## PART 5: TESTING LIVE CONNECTION

After deployment:

1. Open your live frontend: `https://foodflow.vercel.app`
2. Open browser DevTools → **Network** tab
3. Load the page
4. Look for API calls like:
   - `GET https://foodflow-api.render.com/api/v1/category/getAll`
   - Should get **Status: 200** (success)
5. If you see data loading, connection works! ✅

---

## TROUBLESHOOTING

### **Frontend shows "CORS error"**

- ✅ Make sure backend `FRONTEND_URL` is set correctly
- ✅ Check backend server is running
- ✅ Backend CORS config includes frontend URL

### **Frontend shows "Cannot reach API"**

- ✅ Check `REACT_APP_API_URL` is correct in frontend `.env`
- ✅ Verify backend URL is live (visit it in browser)
- ✅ Check MongoDB connection string is correct

### **Data not loading in frontend**

- ✅ Open DevTools → Network tab
- ✅ Check if API request is being made
- ✅ Check response status (200 = success, 5xx = server error)
- ✅ Check browser console for errors

---

## Quick Commands

**Local Development:**

```bash
# Backend
cd food-AppBackend && npm run dev

# Frontend (new terminal)
cd food-AppFrontend && npm run dev
```

**Production Build:**

```bash
# Frontend only (backend auto-builds on Render/Railway)
cd food-AppFrontend && npm run build
```

---

Done! Your app is now live and connected! 🎉
