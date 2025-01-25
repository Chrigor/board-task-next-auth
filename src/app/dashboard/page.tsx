import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

import { createTask } from "../actions/create-task.action";
import { deleteTask } from "../actions/delete-task.action";

import { db } from "../services/firebase";
import { collection, orderBy, query, where, getDocs } from "firebase/firestore";
import { ShareButton } from "@/app/_components/ShareButton";
import { TextArea } from "@/app/_components/TextArea";

import { Task } from "../interfaces/task";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/");
  }

  const myTasksQuery = query(
    collection(db, "tasks"),
    orderBy("created", "desc"),
    where("user", "==", session?.user?.email)
  );

  const docs = await getDocs(myTasksQuery);
  const myTasks = docs.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Task[];

  return (
    <main className="w-full max-w-[1200px] mx-auto flex flex-col gap-8">
      <section className="w-full">
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <h1 className="text-slate-200 text-3xl font-bold w-full">
            Qual sua tarefa?
          </h1>
          <form action={createTask} className="flex flex-col gap-2 w-full">
            <TextArea name="description" placeholder="Digite sua tarefa ..."/>
            <div className="flex items-center gap-2">
              <input id="public-task" type="checkbox" name="public-task" />
              <label htmlFor="public-task" className="text-slate-200">
                Deixar tarefa publica?
              </label>
            </div>

            <button
              type="submit"
              className="bg-slate-200 text-slate-800 px-4 py-2 rounded w-max"
            >
              Registrar
            </button>
          </form>
        </div>
      </section>
      <section className="w-full">
        <h1 className="w-full text-center text-2xl font-bold text-slate-200 pb-4">
          Minhas tarefas
        </h1>
        <ul className="flex flex-col gap-5">
          {myTasks.map((task) => {
            return (
              <li className="w-full" key={task.id}>
                <article className="w-full border flex flex-col gap-2 p-4 rounded bg-slate-200">
                  {task.public && <ShareButton taskId={task.id} />}
                  <div className="flex justify-between gap-2 items-center">
                    {task.public ? (
                      <Link href={`/task/${task.id}`}>
                        <p className="text-md text-slate-900">
                          {task.description}
                        </p>
                      </Link>
                    ) : (
                      <p className="text-md text-slate-900">
                        {task.description}
                      </p>
                    )}
                    <form action={deleteTask}>
                      <button type="submit">
                        <FaTrash size={24} className="fill-red-800" />
                      </button>
                      <input type="hidden" name="id" value={task.id} />
                    </form>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
