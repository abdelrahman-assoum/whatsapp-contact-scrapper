# 📥 WhatsApp Contact Scraper From Chats (Playwright)

This script uses [Playwright](https://playwright.dev/) to automate WhatsApp Web and scrape all contact names from your chats list. Once finished, it saves the data to an Excel file.

---

## 🚀 Getting Started

Follow the steps below to set up and run the project.

### 1. Download the Code

- **Easiest**: click **“Code → Download ZIP”** on GitHub and extract it locally (ideal if you don’t have Git).
- Or clone with Git:

```bash
git clone https://github.com/abdelrahman-assoum/whatsapp-chat-scraper.git
cd whatsapp-chat-scraper
```

### 2. Run the Launcher

Just double‑click **`run.bat`** in the project root.

> 🛈 Windows may warn that the file is from an unknown publisher.  
> Choose **“Run anyway”** – the script is safe.

`run.bat` will:

1. Install Node dependencies (`npm install`) if missing.
2. Fetch Playwright browsers (`npx playwright install`) on first run.
3. Launch the scraper (`npm start`).
4. Keep the terminal window open so you can watch logs.

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
