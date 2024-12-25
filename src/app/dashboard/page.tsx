import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { createTask } from "../actions/create-task.action";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="w-full max-w-[1200px] mx-auto flex flex-col gap-8">
      <section className="w-full">
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <h1 className="text-slate-200 text-3xl font-bold w-full">
            Qual sua tarefa?
          </h1>
          <form action={createTask} className="flex flex-col gap-2 w-full">
            <textarea
              name="description"
              className="w-full resize-none rounded px-2 py-1 outline-none"
              rows={5}
              placeholder="Digite sua tarefa..."
            ></textarea>
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
          <li className="w-full">
            <article className="w-full border flex flex-col gap-2 p-4 rounded bg-slate-200">
              <div className="flex gap-2">
                <label className="uppercase bg-cyan-600 text-slate-200 px-2 rounded">
                  Publico
                </label>
                <button className="">
                  <FiShare2 className="fill-cyan-600" />
                </button>
              </div>
              <div className="flex justify-between gap-2 items-center">
                <p className="text-md text-slate-900">Minha primeira task</p>
                <button>
                  <FaTrash size={24} className="fill-red-800" />
                </button>
              </div>
            </article>
          </li>
          <li className="w-full">
            <article className="w-full border flex flex-col gap-2 p-4 rounded bg-slate-200">
              <div className="flex gap-2">
                <label className="uppercase bg-cyan-600 text-slate-200 px-2 rounded">
                  Publico
                </label>
                <button className="">
                  <FiShare2 className="fill-cyan-600" />
                </button>
              </div>
              <div className="flex justify-between gap-2 items-center">
                <p className="text-md text-slate-900">Minha primeira task</p>
                <button>
                  <FaTrash size={24} className="fill-red-800" />
                </button>
              </div>
            </article>
          </li>
        </ul>
      </section>
    </main>
  );
}
