"use server";
import { Operation } from "@/types";
import { addOperation } from "../lib/sheets";

export async function submitOperationForm(data: Operation) {
  await addOperation(data);
}
