"use server";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  try {
    const session = await getServerSession();

    const task = {
      public: formData.get("public-task") === "on" ? true : false,
      description: formData.get("description"),
      created: new Date(),
      user: session?.user?.email,
    };

    await addDoc(collection(db, "tasks"), task);
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
}
