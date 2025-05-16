# 📥 WhatsApp Contact Scraper From Chats (Playwright)

This script uses [Playwright](https://playwright.dev/) to automate WhatsApp Web and scrape all contact names from your chats list. Once finished, it saves the data to an Excel file.

---


## ✅ Requirements

- You must have **Node.js** installed on your device.

If you don't have it, you can download and install it from the official Node.js website:

👉 [https://nodejs.org/](https://nodejs.org/)

---


## 🚀 Getting Started

Follow the steps below to set up and run the project.

### 1. Clone the Repository

```bash
git clone https://github.com/abdelrahman-assoum/whatsapp-contact-scraper.git
cd whatsapp-contact-scraper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

> ⚠️ This may take some time depending on your internet speed.

### 4. Start the Script

```bash
npm start
```

---

## 🔍 How It Works

1. A browser window will open.
2. Scan the WhatsApp QR code to log in.
3. Wait for your chat list to load completely.
4. Two buttons will appear in the top-right corner:
   - ✅ `📥 Scrape Numbers` – Start scraping all chat contact names.
   - 🛑 `Stop` – Cancel scraping midway.
5. Once scraping completes, an Excel file will be saved in the `/sheets` directory as:

```
/sheets/time-whatsapp_contacts.xlsx
```

---

## 📄 Output

The Excel file contains:

- A serial number.
- The contact name (or number if the contact is not saved) of each chat.

---

## 🧾 Logging

You can monitor progress and messages in your **terminal console**, including when scraping starts, stops, and finishes.

---

## 📦 Folder Structure

```
.
├── sheets/
│   └── whatsapp_contacts.xlsx   # Output Excel file
├── index.js                     # Main script
├── package.json
└── README.md
```
