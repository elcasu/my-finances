"use server";
import { Operation } from "@/types";
import { getServerSession } from "next-auth";
import { addOperation } from "../lib/sheets";

export async function submitOperationForm(data: Operation) {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  await addOperation(data);
}
