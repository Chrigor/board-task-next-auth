"use server";

import { revalidatePath } from "next/cache";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

export async function deleteTask(formData: FormData) {
  try {
    await deleteDoc(doc(db, "tasks", formData.get("id") as string));
    revalidatePath("/dashboard");
  } catch (error: any) {
    console.log(error.message);
  }
}
