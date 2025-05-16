const { chromium } = require("playwright");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await chromium.launchPersistentContext("./whatsapp-profile", {
    headless: false,
    slowMo: 50,
    viewport: { width: 1280, height: 800 },
  });

  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com");

  await page.waitForSelector('div[aria-label="Search input textbox"]', {
    timeout: 0,
  });

  // ✅ Inject control buttons
  await page.evaluate(() => {
    window.scrapeRunning = false;

    const createButton = (text, id, color, onclick) => {
      const btn = document.createElement("button");
      btn.innerText = text;
      btn.id = id;
      btn.style.position = "fixed";
      btn.style.top = id === "scrapeBtn" ? "20px" : "70px";
      btn.style.right = "20px";
      btn.style.zIndex = "9999";
      btn.style.padding = "10px 20px";
      btn.style.background = color;
      btn.style.color = "white";
      btn.style.fontSize = "16px";
      btn.style.border = "none";
      btn.style.borderRadius = "8px";
      btn.onclick = onclick;
      document.body.appendChild(btn);
    };

    createButton("📥 Scrape Numbers", "scrapeBtn", "green", () => {
      window.scrapeRunning = true;
      window.scrapeContacts?.();
    });

    createButton("🛑 Stop", "stopBtn", "red", () => {
      if (window.scrapeRunning) {
        window.scrapeRunning = false;
        console.log("🛑 Stop requested.");
      } else {
        console.log("⚠️ No scraping in progress.");
      }
    });
  });

  // ✅ Scraping logic exposed to page
  await page.exposeFunction("scrapeContacts", async () => {
    console.log("🔍 Scraping started...");

    // Run in browser context
    await page.evaluate(async () => {
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));

      const scrollContainer = document.querySelector("#pane-side");
      const chatSelector = "div._ak8q span[title]";
      window._seenTitles = new Set();

      while (
        window.scrapeRunning &&
        scrollContainer.scrollTop + scrollContainer.clientHeight <
          scrollContainer.scrollHeight
      ) {
        // Collect current visible chats
        document.querySelectorAll(chatSelector).forEach((el) => {
          const title = el.getAttribute("title");
          if (title) window._seenTitles.add(title);
        });

        scrollContainer.scrollBy(0, 300);
        await delay(1000);
      }

      // Final scrape after last scroll
      document.querySelectorAll(chatSelector).forEach((el) => {
        const title = el.getAttribute("title");
        if (title) window._seenTitles.add(title);
      });
    });

    // Get scraped contact names back in Node.js context
    const contacts = await page.evaluate(() => Array.from(window._seenTitles));
    const uniqueContacts = [...new Set(contacts)];

    console.log("✅ Total contacts scraped:", uniqueContacts.length);

    const data = uniqueContacts.map((name, index) => ({
      No: index + 1,
      Contact: name,
    }));

     const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "time-whatsapp-contact");
    
        const timestamp = new Date()
          .toISOString()
          .replace(/[:.]/g, "-")
          .slice(0, 19);
    
        const sheetsDir = path.join(__dirname, "sheets");
        if (!fs.existsSync(sheetsDir)) fs.mkdirSync(sheetsDir);
    
        const filename = path.join(
          sheetsDir,
          `time-whatsapp-contact-${timestamp}.xlsx`
        );
        XLSX.writeFile(workbook, filename);
    
        console.log(`🎉 Exported ${data.length} contacts to ${filename}`);
  });
  
})();
