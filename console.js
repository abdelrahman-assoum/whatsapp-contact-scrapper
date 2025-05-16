// Code to run direct in Console
(async function scrapeWhatsAppToExcel() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const scrollContainer = document.querySelector("#pane-side");
  const chatSelector = "div._ak8q span[title]";

  const seen = new Set();

  let unchangedScrolls = 0;
  const maxUnchanged = 5;

  while (unchangedScrolls < maxUnchanged) {
    const initialCount = seen.size;

    document.querySelectorAll(chatSelector).forEach((el) => {
      seen.add(el.getAttribute("title"));
    });

    scrollContainer.scrollBy(0, 300);
    await delay(1000);

    const newCount = seen.size;
    unchangedScrolls = newCount === initialCount ? unchangedScrolls + 1 : 0;
  }

  const data = Array.from(seen).map((name, index) => ({
    No: index + 1,
    Contact: name,
  }));

  console.log("✅ Total contacts:", data.length);
  console.table(data);

  // Load SheetJS library
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
  document.body.appendChild(script);

  script.onload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "WhatsApp Contacts");

    XLSX.writeFile(workbook, "whatsapp_contacts.xlsx");
    console.log("📁 Excel file downloaded");
  };
})();
