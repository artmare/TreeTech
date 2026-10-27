import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { SpreadsheetFile, Workbook } = require("@oai/artifact-tool");

const outputDir = path.resolve("artifacts");
const outputPath = path.join(outputDir, "TreeTech-CRM.xlsx");

const schemas = {
  Leads: [
    "id", "createdAt", "updatedAt", "name", "company", "email", "phone",
    "language", "source", "sourceUrl", "service", "industry", "location",
    "status", "priority", "budget", "value", "message", "aiSummary",
    "nextAction", "nextActionAt", "lastContactAt", "notes", "driveFolderId",
    "resendEmailId", "archived",
  ],
  Activities: ["id", "leadId", "type", "description", "createdAt", "createdBy"],
  Tasks: ["id", "leadId", "title", "description", "dueAt", "status", "createdAt", "completedAt"],
  Settings: ["key", "value", "description"],
};

const workbook = Workbook.create();

for (const [sheetName, headers] of Object.entries(schemas)) {
  const sheet = workbook.worksheets.add(sheetName);
  const lastColumn = columnName(headers.length);
  const headerRange = sheet.getRange(`A1:${lastColumn}1`);
  headerRange.values = [headers];
  headerRange.format = {
    fill: "#111827",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: "#374151" },
  };
  headerRange.format.rowHeightPx = 34;
  headerRange.format.columnWidthPx = 150;
  sheet.freezePanes.freezeRows(1);
  sheet.showGridLines = false;
}

const leads = workbook.worksheets.getItem("Leads");
leads.getRange("A:A").format.columnWidthPx = 255;
leads.getRange("B:C").format.columnWidthPx = 170;
leads.getRange("D:F").format.columnWidthPx = 190;
leads.getRange("J:J").format.columnWidthPx = 260;
leads.getRange("R:R").format.columnWidthPx = 420;
leads.getRange("S:S").format.columnWidthPx = 360;
leads.getRange("W:W").format.columnWidthPx = 320;
leads.getRange("N2:N1000").dataValidation = {
  rule: { type: "list", values: ["new", "contacted", "qualified", "proposal", "won", "lost"] },
};
leads.getRange("O2:O1000").dataValidation = {
  rule: { type: "list", values: ["low", "medium", "high"] },
};
leads.getRange("I2:I1000").dataValidation = {
  rule: { type: "list", values: ["website_form", "assistant", "free_analysis", "outbound", "referral", "email", "manual", "other"] },
};
leads.getRange("K2:K1000").dataValidation = {
  rule: { type: "list", values: ["website", "automation", "custom_software", "integration", "unsure"] },
};

const tasks = workbook.worksheets.getItem("Tasks");
tasks.getRange("F2:F1000").dataValidation = {
  rule: { type: "list", values: ["open", "completed"] },
};

const settings = workbook.worksheets.getItem("Settings");
settings.getRange("A2:C5").values = [
  ["schemaVersion", "1", "TreeTech CRM worksheet schema version"],
  ["storage", "Google Sheets", "Structured CRM v1 storage"],
  ["documents", "Google Drive", "Qualified lead and client documents"],
  ["sourceMigration", "Supabase contact_requests", "Original records remain untouched as a backup"],
];
settings.getRange("A2:C5").format = {
  fill: "#F8FAFC",
  font: { color: "#111827" },
  borders: { preset: "all", style: "thin", color: "#E5E7EB" },
  wrapText: true,
};
settings.getRange("A:A").format.columnWidthPx = 200;
settings.getRange("B:B").format.columnWidthPx = 220;
settings.getRange("C:C").format.columnWidthPx = 520;

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

const inspection = await workbook.inspect({
  kind: "sheet,region",
  range: "A1:C6",
  maxChars: 3500,
  tableMaxRows: 6,
  tableMaxCols: 6,
});

const preview = await workbook.render({
  sheetName: "Settings",
  autoCrop: "all",
  scale: 1,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "TreeTech-CRM-preview.png"), new Uint8Array(await preview.arrayBuffer()));

process.stdout.write(`${outputPath}\n${inspection.ndjson ?? inspection}\n`);

function columnName(count) {
  let result = "";
  let value = count;
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}
