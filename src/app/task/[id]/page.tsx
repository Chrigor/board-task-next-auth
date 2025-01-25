import { TextArea } from "@/app/_components/TextArea";
import { Task } from "@/app/interfaces/task";
import { db } from "@/app/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Detalhes da tarefa",
};

interface Params {
  id: string;
}

export default async function TaskDetails({ params }: { params: Params }) {
  const taskId = params.id;
  const docRef = doc(db, "tasks", taskId);
  const task = (await getDoc(docRef)).data() as Task;

  if (!task) {
    redirect("/");
  }

  if (!task.public) {
    redirect("/");
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8">
      <header>
        <h1 className="text-slate-200 text-2xl font-bold">Tarefa</h1>
      </header>
      <main>
        <article className="w-full rounded px-6 py-4 outline-none border">
          <p className="text-slate-200 whitespace-pre-wrap">
            {task.description}
          </p>
        </article>
      </main>
      <section className="flex flex-col gap-2 w-full">
        <h2 className="text-slate-200 text-xl font-bold">Deixar comentário</h2>
        <form className="w-full">
          <TextArea placeholder="Digite seu comentário..." />
          <button
            type="submit"
            className="bg-slate-200 text-slate-800 px-4 py-2 rounded w-max"
          >
            Enviar comentário
          </button>
        </form>
      </section>
    </div>
  );
}
