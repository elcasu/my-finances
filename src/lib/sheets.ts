import { google } from "googleapis";
import { Operation, Category } from "@/types";

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

export async function getOperationCategories() {
  const sheets = getSheetsClient();
  const fieldsResult = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Categories!A1:C1",
  });
  const fields = fieldsResult.data.values?.[0] as unknown as string[];
  if (!fields?.length) return;

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Categories!A2:C",
    majorDimension: "COLUMNS",
  });
  return {
    [fields[0]]: result?.data?.values?.[0],
    [fields[1]]: result?.data?.values?.[1],
    [fields[2]]: result?.data?.values?.[2],
  };
}
