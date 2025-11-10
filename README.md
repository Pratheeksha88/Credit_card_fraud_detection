# 💳 Credit Card Fraud Detection — Full Stack Web Application

A complete **Full Stack Machine Learning Web App** that detects fraudulent credit card transactions using a trained model.  
Built with **React (frontend)**, **Node.js + Express (backend)**, **MongoDB (database)**, and a **Flask ML microservice** powered by **scikit-learn**.

---

## 🚀 Features

### 🌐 Frontend (React + Vite + Tailwind)
- Elegant **login/register system**
- **JWT authentication** for secure access
- **Interactive dashboard** with fraud insights
- Beautiful **data visualization** using Recharts
- Upload or manually enter transactions for predictions

### ⚙️ Backend (Node.js + Express + MongoDB)
- **User authentication** using JWT
- **Protected routes** for prediction requests
- Communicates securely with ML microservice
- Stores **prediction history** per user

### 🧠 ML Service (Python + Flask)
- Trains a **Random Forest model** on the Kaggle Credit Card Fraud dataset
- Exposes REST endpoint `/predict` for real-time predictions
- Uses **KaggleHub** to automatically download the dataset
- Saves the model as `model.pkl` for fast inference

---

## 🗂️ Project Structure

```
credit-card-fraud-detection/
├── backend/                # Express + MongoDB API
│   ├── server.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── predictController.js
│   ├── models/
│   │   ├── Prediction.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── predict.js
│   ├── package.json
│   ├── .gitignore
│   └── .env (not included)
├── frontend/               # React + Tailwind Dashboard
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChartCard.jsx
│   │   │   ├── DashboardNavbar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Overview.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ResearchOverview.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   │   ├── assets/
│   │   │   └── ai-analysis.jpg
│   │   ├── fraud_demo.csv
│   │   ├── fraud_sample.csv
│   │   ├── fraud_test_done.csv
│   │   ├── fraud_test_final.csv
│   │   ├── fraud_test_mixed.csv
│   │   ├── fraud_test.csv
│   │   ├── fraud_test1.csv
│   │   ├── fraud_test2.csv
│   │   ├── frauddetect.png
│   │   └── sample.csv
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── .gitignore
├── ml-service/             # Flask ML microservice
│   ├── app.py
│   ├── download_dataset.py
│   ├── feature_names.json
│   ├── requirements.txt
│   ├── test_api.py
│   ├── train_balanced_model.py
│   ├── train_final_model.py
│   ├── train_model.py
│   ├── train_real_model.py
│   ├── train_sensitive_model.py
│   ├── train.py
│   ├── .gitignore
│   └── model.pkl (generated)
├── .gitignore
├── package.json
└── README.md
```

---

## 🧩 Technologies Used

| Layer | Technology |
|-------|-------------|
| Frontend | React, Vite, Tailwind CSS, Axios, Recharts |
| Backend | Node.js, Express.js, MongoDB, JWT, Axios |
| ML Service | Python, Flask, scikit-learn, Pandas, KaggleHub |
| Dataset | [Kaggle – Credit Card Fraud Detection](https://www.kaggle.com/mlg-ulb/creditcardfraud) |

---

## ⚙️ Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/fraud-detect-app.git
cd fraud-detect-app
````

---

### 2️⃣ Backend Setup (Node + MongoDB)

```bash
cd backend
npm install
cp .env.example .env
```

Edit your `.env` file:

```
MONGO_URI=mongodb://localhost:27017/fraudDB
JWT_SECRET=your_secret_key
ML_URL=http://localhost:5000
PORT=4000
```

Start the backend:

```bash
npm run dev
```

---

### 3️⃣ ML Service Setup (Flask)

```bash
cd ml-service
pip install -r requirements.txt
python train_sensitive_model.py   # trains model and generates model.pkl
python app.py     # starts Flask server
```

You should see:

```
Running on http://localhost:5000
```

---

### 4️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔁 Flow Diagram

```
React Dashboard (Frontend)
       ↓   (Axios)
Node/Express Backend  ←→  MongoDB
       ↓
   Flask ML API
       ↓
   model.pkl (Prediction)
```

---

## 🧠 How the Model Works

* Dataset: 284,807 transactions (492 frauds)
* Model: Random Forest Classifier (handles imbalance using `class_weight='balanced'`)
* Features: anonymized PCA features (`V1`–`V28`), `Amount`, `Time`
* Output: `0` = Legitimate, `1` = Fraudulent

---

## 📊 Example API Call

**POST** `/api/predict`

Request body:

```json
{
  "features": {
    "V1": -1.359807,
    "V2": 1.191857,
    "V3": -1.358354,
    "V4": -0.072781,
    "Amount": 149.62,
    "Time": 0
  }
}
```

Response:

```json
{
  "success": true,
  "predictions": [0],
  "probabilities": [0.01]
}
```

---

## 🛡️ Security & Ethics

* No real credit card data used — dataset is **anonymized**
* No storage of sensitive user or payment info
* JWT-based secure login and route protection
* Model used for **educational & research** purposes only

---

## 📦 Deployment Tips

* Use **Render** or **Railway** for backend & ML service
* Use **Vercel** or **Netlify** for frontend hosting
* Use **MongoDB Atlas** for cloud database
* Configure CORS properly (`http://your-frontend-domain`)

---

## 🧰 Future Improvements

* 📈 Live retraining and model updates
* 🔍 Explainable AI (feature importance)
* 🧾 Export prediction reports (CSV/PDF)
* 🔔 Email notifications for detected frauds
* 🧩 Docker Compose for all services

---

## 👩‍💻 Author

**Poorvi Shetty**
💡 Computer Science Student
📘 Full Stack + Machine Learning Developer

---

## 📝 License

This project is released under the **MIT License**.
You are free to use, modify, and distribute it for learning or research purposes.

---

### ⭐ If you like this project, give it a star on GitHub! ⭐


