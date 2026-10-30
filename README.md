# 👕 ClothStore AI - Gen AI Powered E-Commerce

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Pydantic AI](https://img.shields.io/badge/Pydantic_AI-F05023?style=for-the-badge&logo=ai&logoColor=white)](https://pydantic.dev/)

Welcome to **ClothStore AI**! This project is a modern LLM-powered shopping experience. It features a sleek **Frontend** (Vanilla JS), a robust **FastAPI Backend**, a **MongoDB** database, and an intelligent **AI Shopping Assistant** powered by **Pydantic AI**.

---

## ⚡ Run It Locally (5 Steps)

**You need:** Python **3.11** ([Miniconda](https://www.anaconda.com/download/success) recommended), a **MongoDB** connection string (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local MongoDB), and a free **[Groq API key](https://console.groq.com/keys)**.

Run these commands in a terminal (in VS Code: **Terminal → New Terminal**).

**1. Download the project**
```bash
git clone https://github.com/akshitasankhwar/Gen-AI-Powered-Clothing-Store-with-Pydantic-AI.git
cd Gen-AI-Powered-Clothing-Store-with-Pydantic-AI
```

**2. Create and activate a Python 3.11 environment**
```bash
conda create -n clothstore python=3.11 -y
conda activate clothstore
```
<details>
<summary>No Conda? Use a venv instead</summary>

```bash
python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # Mac / Linux
```
On Windows PowerShell, if activation is blocked, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned` first.
</details>

**3. Install the requirements**
```bash
pip install -r requirements.txt
```

**4. Create your `.env` file** from the example, then open `.env` and fill in your keys
```bash
cp .env.example .env           # works in PowerShell, Mac and Linux (Command Prompt: copy .env.example .env)
```

| Variable | Required? | What to put |
| :--- | :--- | :--- |
| `MONGO_URI` | ✅ Yes | Your MongoDB connection string (Atlas → **Connect → Drivers**), or `mongodb://localhost:27017` for a local MongoDB |
| `GROQ_API_KEY` | ✅ Yes | Your key from [console.groq.com/keys](https://console.groq.com/keys) |
| `GROQ_MODEL` | Optional | Groq model for the AI chat (default: `openai/gpt-oss-120b`) |
| `LOGFIRE_TOKEN` | Optional | [Pydantic Logfire](https://logfire.pydantic.dev) token for monitoring |

**5. Start the store**
```bash
python main.py
```
Then open **[http://localhost:8000](http://localhost:8000)** 🎉 API docs are at [http://localhost:8000/docs](http://localhost:8000/docs).

> ⚠️ The terminal prints `Uvicorn running on http://0.0.0.0:8000`. Don't open that link (browsers show `ERR_ADDRESS_INVALID`); use `localhost` instead.
>
> 🛍️ **First run:** the store is empty. Click **Add Products → ⚡ Generate 500 Demo Products** to fill it.

**Next time**, you only need:
```bash
conda activate clothstore
python main.py
```

---

- **📦 Dynamic Catalog**: Browse and filter clothing products by category (Men, Women, Kids) and price range.
- **🤖 AI Shopping Assistant**: A super-smart agent powered by **Pydantic AI** (GPT-OSS 120B via Groq, changeable with `GROQ_MODEL`) that understands natural language queries and finds products instantly.
- **🛒 Smart Shopping Cart**: Add items to your cart and manage them with ease.
- **🚀 Bulk Store Generation**: Instantly populate your database with 500+ diverse demo products for testing.
- **📜 Simple Checkout**: Place orders using just an email identifier—no complex auth required for this demo.
- **🔭 Deep Observability**: Integrated with **Pydantic Logfire** for real-time monitoring of both the API and the AI agent.
- **🛠️ Admin Control**: Comprehensive endpoints for full CRUD operations on product inventory.

---

## 🛠️ Technology Stack

We built this mall using the best modern materials:

### Frontend (The Storefront)
- **Native Vanilla JS** (Loads the store visually instantly)
- **CSS** (Helps make things look pretty)

### Backend (The Warehouse Manager)
- **FastAPI** (Extremely fast Python worker that handles requests)
- **MongoDB Atlas** (Flexible digital filing cabinets for data)
- **Pydantic AI & Groq** (The smart brain of our AI Salesman)
- **Pydantic Logfire** (The security camera monitoring everything inside)

---

## 📖 Complete Documentation

Want to learn how it all works? We have easy-to-read guides!
Check the **[`docs/README.md`](./docs/README.md)** for the full table of contents, including a simple **Terminology Guide**!

---

## 🔌 API Endpoints

FastAPI automatically generates an interactive map for all endpoints:
- Go to **`http://localhost:8000/docs`** to test the API!

Here are the primary routes:
| What it does | Method | Door (URL) |
| :--- | :--- | :--- |
| Browse/List Products | `GET` | `/products` |
| Add a New Product | `POST` | `/products` |
| Bulk Generate (500 Demo Items) | `POST` | `/products/bulk-generate-500` |
| Add item to Cart | `POST` | `/cart/add` |
| Get User's Cart | `GET` | `/cart/{email}` |
| Place New Order | `POST` | `/orders` |
| Talk to AI Assistant | `POST` | `/chat` |

---

## 📝 License

Distributed under the **MIT License**. Have fun building!
