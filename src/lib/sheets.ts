import { google } from "googleapis";
import { Operation } from "@/types";

export function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

function sheetsDateNumber(date = new Date()) {
  return date.getTime() / 86400000 + 25569;
}

export async function addOperation(data: Operation) {
  const sheets = getSheetsClient();
  const timestamp = sheetsDateNumber(new Date());

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Form Responses 1!A:E",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[timestamp, data.amount, data.type, data.category, data.notes]],
    },
  });
}
